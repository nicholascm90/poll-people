/*pollApp.directive('twitter', [
    function() {
        return {
            link: function(scope, element, attr) {
                setTimeout(function() {
                        twttr.widgets.createShareButton(
                            attr.url,
                            element[0],
                            function(el) {}, {
                                count: 'none',
                                text: attr.text
                            }
                        );
                });
            }
        }
    }
]); */



pollApp.directive('twitterShare', function() {
    
    return {   
        
        restrict: 'E',
        scope: true, 
        template: "<div id = 'theContainer'></div>", 
        link: function(scope, element, attrs) {
            
            scope.$watch(function(scope) { return scope.result.question; }, function(question) { 
                
                if (question) {
                   twttr.widgets.createShareButton(
                    'https://poll-app-nicholascm90.c9users.io/#/results/'+scope.result.id, element[0],
                    {
                        text: "Check out my poll results for "+"'"+scope.result.question+"'"
    
                    }).then(function() {console.log("done")});
                 }
        }
        
    
        )}
    
    }
});
