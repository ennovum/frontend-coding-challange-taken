/******************************************************************************************

Angular sortimate Directive

This directive animates sorting of children elements (in Y axis)

******************************************************************************************/

var app = angular.module("alchemytec.sortimate", []);

app.directive("sortimate", ["$parse", function($parse) {
    var link = function($scope, $element, $attrs) {
        var previousItems = [];

        var reorder = function () {
            var elements = Array.prototype.slice.call($element[0].children);
            var items = evalItems(elements);

            items.forEach(function (item) {
                var index = item.index;
                var previousIndex = findPreviousIndex(item, previousItems);

                if (previousIndex !== null) {
                    lockTransition(item);
                    fakePreviousPosition(item, items, index, previousIndex);

                    setTimeout(function () {
                        unlockTransition(item);
                        resetPosition(item);
                    }, 0);
                }
            });

            previousItems = items;
        };

        var evalItems = function (elements) {
            return elements.map(function (element, index) {
                return {
                    element: element,
                    index: index,
                    clientHeight: element.clientHeight
                };
            });
        };

        var findPreviousItem = function (item, previousItems) {
            return _.find(previousItems, function (previousItem) {
                return previousItem.element === item.element;
            });
        };

        var findPreviousIndex = function (item, previousItems) {
            var previousItem = findPreviousItem(item, previousItems);
            return previousItem ? previousItem.index : null;
        };

        var lockTransition = function (item) {
            item.element.style.transition = 'none';
        };

        var unlockTransition = function (item) {
            item.element.style.transition = '';
        };

        var fakePreviousPosition = function (item, items, index, previousIndex) {
            var offset = 0;

            if (index < previousIndex) {
                for (var i = index; i < previousIndex; i++) {
                    offset += items[i] ? items[i].clientHeight : 0;
                }
            }
            else if (index > previousIndex) {
                for (var i = index; i > previousIndex; i--) {
                    offset -= items[i] ? items[i].clientHeight : 0;
                }
            }

            item.element.style.transform = 'translateY(' + offset + 'px)';
        };

        var resetPosition = function (item) {
            item.element.style.transform = '';
        };

        $scope.$watch($attrs.sortimate, () => {
            reorder();
        }, true);
    };

    return {
        restrict: "A",
        link: link
    };
}]);
