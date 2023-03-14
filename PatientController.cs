using Hospital_Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Hospital_Management.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PatientController : ApiController

    {
        private readonly Hospital_Management_SystemEntities1 db = new Hospital_Management_SystemEntities1();

        public PatientController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }


        [HttpGet]
        public IEnumerable<Patient> List()
        {
            return db.Patients.ToList();
        }

        [HttpPost]
        public HttpResponseMessage AddPatient(Patient obj)
        {
            try
            {
                db.Patients.Add(obj);
                db.SaveChanges();
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Created);
                return response;

            }
            catch (Exception)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                return response;
            }
        }
        [HttpPut]
        public HttpResponseMessage Update(int id, Patient obj)
        {
            try
            {
                if (id == obj.Patient_Id)
                {
                    db.Entry(obj).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotModified);
                    return response;
                }


            }
            catch (Exception)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                return response;
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            Patient obj = db.Patients.Find(id);
            if (obj != null)
            {
                db.Patients.Remove(obj);
                db.SaveChanges();
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                return response;
            }
            else
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotFound);
                return response;
            }
        }
        [HttpGet]
        public Patient Search(int id)
        {
            Patient obj = db.Patients.Find(id);
            return obj;
        }
    }
}

