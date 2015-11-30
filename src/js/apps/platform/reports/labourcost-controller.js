"use strict";

/******************************************************************************************

Labour Cost Report controller

******************************************************************************************/

var SORT_FIELD_DEFAULT = "name";
var SORT_DIRECTION_DEFAULT = "asc";

var app = angular.module("labourcost.controller", [
	"labourcost.service"
]);

app.controller("ctrlLabourCost", ["$rootScope", "$scope", "$filter", "navigation", "labourcost", function LabourCostCtrl($rootScope, $scope, $filter, $navigation, $labourcost) {
	// Set the navigation tabs
	$navigation.select({
		forward: "reports",
		selected: "labourreport"
	});

    this.costReport = null;

	$labourcost.getCostReport().then(function(costReport) {
        this.setData(costReport);
	}.bind(this));

    $scope.costProviders = null;
    $scope.costDirectContractors = null;

    this.sortField = SORT_FIELD_DEFAULT;
    this.sortDirection = SORT_DIRECTION_DEFAULT;

    this.setData = function (costReport) {
        this.costReport = costReport;

        $scope.costProviders = this.costReport.providers;
        $scope.costDirectContractors = this.costReport.directContractors;
        $scope.costTotal = this.costReport.total;

        this.applySort();
    }.bind(this);

    $scope.toggleSort = function (field, direction) {
        if (field === this.sortField) {
            this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        }
        else {
            this.sortField = field;
            this.sortDirection = direction;
        }

        this.applySort();
    }.bind(this);

    this.applySort = function () {
        var costProviders = this.costReport.providers;
        var costDirectContractors = this.costReport.directContractors;
        var costTotal = this.costReport.total;

        if (this.sortField !== "name") {
            costProviders = costProviders.concat(costDirectContractors);
            costDirectContractors = null;
        }

        $scope.costProviders = $filter("orderBy")(costProviders, this.sortField, this.sortDirection !== SORT_DIRECTION_DEFAULT);
        $scope.costDirectContractors = costDirectContractors;
        $scope.costTotal = costTotal;
    }

    $scope.isSortBy = function (field, direction) {
        return field === this.sortField && (direction ? direction === this.sortDirection : true);
    }.bind(this);
}]);
