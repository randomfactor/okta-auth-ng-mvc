using System;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace dotnetokta.Models
{
    public class HeldValue
    {
        public string name { get; set; }
        public string ownerId { get; set; }
        public string ownerName { get; set; }

        public HeldValue(string n, string id, string owner)
        {
            this.name = n;
            this.ownerId = id;
            this.ownerName = owner;
        }
    }
    public class ValuesRepository
    {
        public static ValuesRepository Instance = new ValuesRepository();

        private List<HeldValue> Repo;
        private ValuesRepository()
        {
            this.Repo = new List<HeldValue>() {
                new HeldValue("value1", null, null),
                new HeldValue("value2", null, null)
            };
        }

        public IList<HeldValue> GetAll() {
            return (this.Repo);
        }

        public void Create(string value, string id, string owner)
        {
            HeldValue newVal = new HeldValue(value, id, owner);
            this.Repo.Add(newVal);
        }

        public bool Delete(string value, string id)
        {
            HeldValue victim = this.Repo.Find((v) => v.name == value && v.ownerId == id);
            if (victim != null) {
                return (this.Repo.Remove(victim));
            } 
            else 
            {
                return (false);
            }
        }
    }
}