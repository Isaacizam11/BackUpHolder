using API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccessController : ApiController
    {
        UCTEntities db = new UCTEntities();

        public static string ApplySomeSalt(string input)
        {
            try
            {
                return "4dfgdfgdfg5gd5451gdfg8d1gdfg1d" + input + "156g56341dgdf186591g6d";
            }
            catch
            {
                string err = "ApplySomeSalt() failed.";
                return (err);
            }
        }
        public static string GenerateHash(string Inputstring)
        {
            try
            {
                SHA256 sha256 = SHA256Managed.Create();
                byte[] bytes = Encoding.UTF8.GetBytes(Inputstring);
                byte[] hash = sha256.ComputeHash(bytes);
                return GetStringFromHash(hash);
            }
            catch
            {
                return null;
            }
        }
        private static string GetStringFromHash(byte[] hash)
        {
            try
            {
                StringBuilder result = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    result.Append(hash[i].ToString("X2"));
                }
                return result.ToString();
            }
            catch
            {
                return null;
            }
        }

        [Route("api/Access/Register/{userroleid}")]
        [HttpPost]
        public dynamic Register([FromBody] User user, int userroleid)
        {
            db.Configuration.ProxyCreationEnabled = false;
            User usr = new User();
            try
            {
                var hash = GenerateHash(ApplySomeSalt(user.Password));
                usr.Username = user.Username;
                if (userroleid == 555) //Admin
                {
                    UserRole RoleUpdate = new UserRole();

                    UserRole role = db.UserRoles.Where(x => x.name == "Administrator").FirstOrDefault();
                    usr.UserRole_ID = role.id;

                }

                usr.UserRole_ID = 2;
                usr.Password = hash;
                usr.Email = user.Email;
                usr.Username = user.Username;
                usr.FirstName = user.FirstName;
                usr.Surname = user.Surname;
                usr.isGuest = true;
                usr.IdNumber = user.IdNumber;
                usr.UserTypeId = 2;



                db.Users.Add(usr);
                db.SaveChanges();

                return usr;
            }
            catch (Exception e)
            {
                return e;
            }
        }
        [Route("api/Access/Login")]
        [HttpPost] //Eventually we need to check if the user is active or registered before logging in 
        public object Login([FromBody] User usr)
        {
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                var hash = GenerateHash(ApplySomeSalt(usr.Password));
                int otp = Convert.ToInt32(usr.Password);
                User user = db.Users.Where(zz => zz.Email == usr.Email && zz.Password == hash).FirstOrDefault();

                dynamic ToReturn = new ExpandoObject();
                if (user != null)
                {
                    ToReturn.User_ID = user.id;
                    ToReturn.Username = user.Username;
                    ToReturn.Email = user.Email;
                    ToReturn.FirstName = user.FirstName;
                    ToReturn.Surname = user.Surname;
                    ToReturn.type = user.UserTypeId;


                    ToReturn.role = user.UserRole_ID;

                    return ToReturn;
                }
                else
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }
        [HttpGet]
        [Route("api/Access/getUserRoles/")]
        public object GetUserRole()
        {
            db.Configuration.ProxyCreationEnabled = false;
            dynamic results = new ExpandoObject();
            try
            {
                List<UserRole> userroles = db.UserRoles.ToList();

                results = userroles;
                return results;
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("api/Access/DocumentUpload/")]
        public async Task<ActionResult> DocumentUpload(DocumentListVM DocumentInputModel)
        {
            try
            {

                List<Document> DocList = GetDocList(DocumentInputModel.DocumentList);
                db.Documents.AddRange(DocList);
                int NoOfRowsInserted = await db.SaveChangesAsync();
                if (NoOfRowsInserted > 0)
                {
                    //return (new { message = "Documents Saved Successfully", Data = DocList });
                    return null;
                }
                else
                {
                    /// return Ok(new { message = "Something went wrong. Please try again." });
                    return null;
                }
            }
            catch (Exception ex)
            {
                //return ex.Message;
                return null;
            }
        }

        private List<Document> GetDocList(DocumentVM[] lstDocVM)
        {
            //converting document array received to database document table list
            List<Document> DBDocList = new List<Document>();
            foreach (var Doc in lstDocVM)
            {
                // dividing file content from file type
                Doc.DocumentContent = Doc.DocumentContent.Substring(Doc.DocumentContent.IndexOf(",") + 1);
                DBDocList.Add(new Document
                {
                    DocumentName = Doc.DocumentName,
                    DocumentContent = Convert.FromBase64String(Doc.DocumentContent),
                    ContentType = Doc.ContentType,
                    UserId = Doc.UserId

                });
            }
            return DBDocList;
        }
        [HttpGet]
        [Route("DownloadDocument/{DocumentId}")]
        public Document DownloadDoument(long DocumentId)
        {
            try
            {

                Document doc = db.Documents.FirstOrDefault(x => x.DocumentId == DocumentId);

                return doc;
            }
            catch (Exception ex)
            {
                return null;

            }

        }



    }


}
