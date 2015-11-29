"use strict";

/******************************************************************************************

Labour Cost Report service

******************************************************************************************/

var app = angular.module("labourcost.service", []);

app.factory("labourcost", ["$rootScope", "$q", "restalchemy", function LabourCostCtrl($rootScope, $q, $restalchemy) {
    // Initialise the REST api
    var rest = $restalchemy.init({ root: $rootScope.config.api.labourstats.root });
    rest.api = $rootScope.config.api.labourstats;

    var getCostReport = function () {
        var deferred = $q.defer();

        rest.at(rest.api.costs).get()
            .then(function (costs) {
                deferred.resolve(digestCostReport(costs[0]));
            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    };

    var digestCostReport = function (cost) {
        var costReport = {};

        var costTotal = cost.total[0];
        var costDirectContractors = cost.directContractors[0];

        costReport.total = {
            workerCount: costTotal.workerCount || 0,
            compliancePercent: costTotal.complianceStats && costTotal.complianceStats.Total || 0,
            grossPayTotal: costTotal.grossPayTotal || 0,
            payrollAdminTotal: costTotal.payrollAdminTotal || 0,
            labourCostTotal: costTotal.labourCostTotal || 0
        };

        costReport.providers = cost.providers.map(function (provider) {
            return {
                name: provider.name,
                workerCount: provider.workerCount || 0,
                compliancePercent: provider.complianceStats && provider.complianceStats.Total || 0,
                grossPayTotal: provider.grossPayTotal || 0,
                payrollAdminTotal: provider.payrollAdminTotal || 0,
                labourCostTotal: provider.labourCostTotal || 0,
                workForcePercent: costReport.total.labourCostTotal && provider.labourCostTotal / costReport.total.labourCostTotal * 100 || 0
            };
        });

        costReport.directContractors = {
            workerCount: costDirectContractors.workerCount || 0,
            compliancePercent: costDirectContractors.complianceStats && costDirectContractors.complianceStats.Total || 0,
            grossPayTotal: costDirectContractors.grossPayTotal || 0,
            payrollAdminTotal: costDirectContractors.payrollAdminTotal || 0,
            labourCostTotal: costDirectContractors.labourCostTotal || 0,
            workForcePercent: costReport.total.labourCostTotal && costDirectContractors.labourCostTotal / costReport.total.labourCostTotal * 100 || 0
        };

        return costReport;
    };

    return {
        getCostReport: getCostReport
    };
}]);
