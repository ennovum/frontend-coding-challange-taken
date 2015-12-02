"use strict";

/******************************************************************************************

Angular Directives for use in common apps

******************************************************************************************/

require("./directives/spinnything.js");
require("./directives/clicktoggle.js");
require("./directives/sortimate.js");

var app = angular.module("alchemytec.directives", [
	"alchemytec.spinnything",
    "alchemytec.clicktoggle",
    "alchemytec.sortimate"
]);
