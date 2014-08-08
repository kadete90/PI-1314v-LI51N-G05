using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Model.CustomAtribute
{
    public class RangeYearToCurrentYear : RangeAttribute, IClientValidatable 
    {
        public RangeYearToCurrentYear(int year) : base(year, DateTime.Today.Year)
        {
            
        }

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            var rules = new ModelClientValidationRangeRule(ErrorMessage, Minimum, Maximum);
            yield return rules;
        }
    }
}
