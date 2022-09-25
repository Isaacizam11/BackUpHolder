using API.Models;
using System;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using HttpDeleteAttribute = System.Web.Http.HttpDeleteAttribute;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CoursesController : ApiController
    {
        private UCTEntities db = new UCTEntities();




        ///////////////
        ///


        [HttpPost]
        [Route("api/Courses/CreateCourse")]
        public IHttpActionResult Create([Bind(Include = "CourseId,CourseDesc,SubjectId")] Cours course)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    db.Courses.Add(course);
                    db.SaveChanges();
                    return Ok(course);
                }

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(course);


        }

        [HttpPost]
        [Route("api/Courses/EditCourse/{id}")]
        public IHttpActionResult Edit([Bind(Include = "CourseId,CourseDesc,SubjectId")] Cours cos, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Cours cours = new Cours();
                cours = db.Courses.Where(c => c.CourseId == id).FirstOrDefault();
                if (cours != null)
                {
                    cours.CourseDesc = cos.CourseDesc;
                    cours.SubjectId = cos.SubjectId;


                }
                int i = db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(cos);

        }

        [HttpDelete]
        [Route("api/Courses/DeleteCourse/{id}")]

        public IHttpActionResult DeleteConfirmed(int id)
        {
            Cours cos = db.Courses.Where(c => c.CourseId == id).FirstOrDefault();
            db.Courses.Remove(cos);
            db.SaveChanges();
            return Ok();
        }
    }
}
