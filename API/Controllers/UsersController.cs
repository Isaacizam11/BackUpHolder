using API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using HttpDeleteAttribute = System.Web.Http.HttpDeleteAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private UCTEntities db = new UCTEntities();
        [HttpGet]
        [Route("api/Users/getUserTypes")]
        public List<UserType> getUserTypes()
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<UserType> types = db.UserTypes.ToList();
                return types;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getLearners")]
        public List<User> getLearners()
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<User> users = db.Users.Where(z => z.UserRole_ID == 2).OrderBy(x => x.UserTypeId).ToList();
                return users;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getAllCourses")]
        public List<Cours> getAllCourses()
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<Cours> courses = db.Courses.ToList();
                return courses;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getAllCoursesCrud")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public dynamic getAllCoursesCrud()
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                //dynamic courses = db.Courses.Include(c => c.Subject).ToList();
                dynamic courses = db.Courses.Include(b => b.Subject).Select(r => new
                {
                    CourseDesc = r.CourseDesc,
                    CourseId = r.CourseId,
                    Subject = r.Subject.SubjectDesc,
                    SubjectId = r.SubjectId
                }).ToList();

                return courses;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getCourses/{id}")]
        public List<Cours> getCourses(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<Cours> types = db.Courses.Where(r => r.Usertype == id).ToList();
                return types;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getProfile/{id}")]
        public object getProfile(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            dynamic ToReturn = new ExpandoObject();
            try
            {
                User user = db.Users.Where(elem => elem.id == id).FirstOrDefault();

                Room_Booking book = db.Room_Booking.Where(x => x.userId == user.id).FirstOrDefault();

                if (book != null)
                {
                    ToReturn.Booking = book;
                }

                ToReturn.FirstName = user.FirstName;
                ToReturn.Surname = user.Surname;
                ToReturn.type = user.UserTypeId;
                ToReturn.type = user.UserTypeId;
                ToReturn.isGuest = user.isGuest;
                ToReturn.Username = user.Username;

                return ToReturn;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpPost]
        [Route("api/Users/UpdateUser/{id}")]
        public IHttpActionResult UpdateUser([Bind(Include = "id,FirstName,Surname")] User user, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                User _user = new User();
                _user = db.Users.Where(c => c.id == id).FirstOrDefault();
                if (_user != null)
                {
                    _user.FirstName = user.FirstName;
                    _user.Surname = user.Surname;
                    _user.UserTypeId = user.UserTypeId;

                }
                int i = db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(user);

        }

        [HttpPost]
        [Route("api/Users/Deregister")]
        public IHttpActionResult Deregister([Bind(Include = "CourseCentreId,Comments")] CourseCentre centre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                CourseCentre _center = new CourseCentre();
                _center = db.CourseCentres.Where(c => c.CourseCentreId == centre.CourseCentreId).FirstOrDefault();
                if (_center != null)
                {
                    _center.Comments = centre.Comments;
                    _center.deregistred = true;

                }
                int i = db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(centre);

        }


        [HttpGet]
        [Route("api/Users/myCourses/{id}")]
        public dynamic myCourses(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            dynamic ToReturn = new ExpandoObject();
            try
            {
                //List<CourseCentre> coursescentre = db.CourseCentres.Where(r => r.userId == id).ToList();
                List<Cours> courses = db.Courses.ToList();


                var coursescentre = db.CourseCentres.Include(c => c.Cours).Include(c => c.Centre).Where(r => r.userId == id && r.deregistred == null).Select(re => new
                {
                    CourseCentreId = re.CourseCentreId,
                    Centre = re.Centre.CentreName,
                    Course = re.Cours.CourseDesc,
                    Marks = re.Marks,
                    Comments = re.Comments,

                }).ToList();


                return coursescentre;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getCentres")]
        public List<Centre> getCentres()
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<Centre> Centres = db.Centres.ToList();
                return Centres;
            }
            catch (Exception)
            {
                return null;
            }

        }

        [Route("api/Users/RegisterCourse")]
        [HttpPost] //Eventually we need to check if the user is active or registered before logging in
        public object SubmitReview([FromBody] CourseCentre course)
        {
            db.Configuration.ProxyCreationEnabled = false;
            CourseCentre courseCentre = new CourseCentre();
            List<object> list = new List<object>();
            try
            {
                List<CourseCentre> Coursecentre = db.CourseCentres.Where(zz => zz.CourseId == course.CourseId).ToList();
                CourseCentre centre = db.CourseCentres.Where(r => r.userId == course.userId && r.CentreId != course.CentreId).FirstOrDefault();


                if (centre == null)
                {
                    if (Coursecentre.Count() < 35)
                    {
                        db.CourseCentres.Add(course);
                        db.SaveChanges();

                        return course;
                    }
                    else
                    {
                        dynamic ToReturn = new ExpandoObject();
                        ToReturn.Message = "number";
                        return ToReturn;
                    }
                }
                else
                {
                    dynamic ToReturn = new ExpandoObject();
                    ToReturn.Message = "centre";
                    return ToReturn;
                }


            }
            catch (Exception rr)
            {

                return rr.Data;
            }
        }


        //    Centre CRUD

        [HttpPost]
        [Route("api/Users/Create")]
        public IHttpActionResult Create([Bind(Include = "CentreId,CentreName,CentreLocation")] Centre centre)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    db.Centres.Add(centre);
                    db.SaveChanges();
                    return Ok(centre);
                }

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(centre);


        }

        [HttpPost]
        [Route("api/Users/EditCentre/{id}")]
        public IHttpActionResult Edit([Bind(Include = "CentreId,CentreName,CentreLocation")] Centre centre, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Centre _centre = new Centre();
                _centre = db.Centres.Where(c => c.CentreId == id).FirstOrDefault();
                if (_centre != null)
                {
                    _centre.CentreName = centre.CentreName;
                    _centre.CentreLocation = centre.CentreLocation;

                }
                int i = db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(centre);

        }

        [HttpDelete]
        [Route("api/Users/DeleteCentre/{id}")]

        public IHttpActionResult DeleteConfirmed(int id)
        {
            Centre centre = db.Centres.Where(c => c.CentreId == id).FirstOrDefault();
            db.Centres.Remove(centre);
            db.SaveChanges();
            return Ok();
        }

        // learners from specific centre
        [HttpGet]
        [Route("api/Users/getSpecificCentreStudents/{id}")]
        public dynamic getSpecificCentreStudents(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                dynamic users = db.CourseCentres.Include(b => b.User).Where(rs => rs.CentreId == id).Select(r => new
                {
                    User = r.User
                }).ToList();
                return users;
            }
            catch (Exception c)
            {
                return null;
            }

        }

        [HttpGet]
        [Route("api/Users/getSpecificCourseStudents/{id}")]
        public dynamic getSpecificCourseStudents(int id)
        {

            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                dynamic users = db.CourseCentres.Include(b => b.User).Where(rs => rs.CourseId == id).Select(r => new
                {
                    User = r.User
                }).ToList();
                return users;
            }
            catch (Exception)
            {
                return null;
            }

        }

    }
}