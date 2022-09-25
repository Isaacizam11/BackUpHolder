using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Mvc;
using API.Models;
using HttpDeleteAttribute = System.Web.Http.HttpDeleteAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;
namespace API.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class SubjectsController : ApiController
    {
        private UCTEntities db = new UCTEntities();

        [HttpGet]
        [Route("api/Subjects/getSubjects")]
        public List<Subject> getSubjects()
        
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<Subject> subjects = db.Subjects.ToList();
                return subjects;
            }
            catch (Exception)
            {
                return null;
            }
        }


    

        ///////////////
        ///


        [HttpPost]
        [Route("api/Subjects/CreateSubject")]
        public IHttpActionResult Create([Bind(Include = "SubjectId,SubjectDesc")] Subject subject)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    db.Subjects.Add(subject);
                    db.SaveChanges();
                    return Ok(subject);
                }

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(subject);


        }

        [HttpPost]
        [Route("api/Subjects/EditSubject/{id}")]
        public IHttpActionResult Edit([Bind(Include = "SubjectId,SubjectDesc")] Subject subject, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Subject sub = new Subject();
                sub = db.Subjects.Where(c => c.SubjectId == id).FirstOrDefault();
                if (sub != null)
                {
                    sub.SubjectDesc = subject.SubjectDesc;

                }
                int i = db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(subject);

        }

        [HttpDelete]
        [Route("api/Subjects/DeleteSubject/{id}")]

        public IHttpActionResult DeleteConfirmed(int id)
        {
            Subject sub = db.Subjects.Where(c => c.SubjectId == id).FirstOrDefault();
            db.Subjects.Remove(sub);
            db.SaveChanges();
            return Ok();
        }
    }
}
