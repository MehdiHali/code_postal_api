// var page = require('webpage').create();
// page.open('https://www.codepostal.ma', function(status) {
//   console.log("Status: " + status);
//   if(status === "success") {
//     page.render('example.png');
//   }
//   phantom.exit();
// });

// page.onResourceError = function(resourceError) {
//   console.error(resourceError.url + ': ' + resourceError.errorString);
// };

// var page = require('webpage').create();
// page.open('https://www.codepostal.ma/code_domicile.aspx', function() {
//   page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//     var title = page.evaluate(function() {
//       __doPostBack('DgVilles$ctl04$Id_ville','');
//       return document.title;
//     });
//     console.log('Page title is ' + title);
//     page.render("9_try.png");
//     phantom.exit();
//   });
// });


// page.open('http://www.sample.com', function() {
//   page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//     page.evaluate(function() {
//       $("button").click();
//     });
//     phantom.exit()
//   });
// });

var page = new WebPage(), testindex = 0, loadInProgress = false,outHTML = "";

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  {
    title: "openning url ...",
    action: function() {
      //Load Login Page
      page.open("https://www.codepostal.ma/code_domicile.aspx");
    }
},
  {
    title: "Filling form ...",
    action : function() {
    //Enter Credentials
    page.evaluate(function() {

      var theForm = document.forms['Form1'];
      if (!theForm) 
          theForm = document.Form1;
      
              theForm.__EVENTTARGET.value = "DgVilles$ctl40$Id_ville";
              theForm.__EVENTARGUMENT.value = "";
      return;
    });
  }}, 
  {
    title: "Submiting from ...",
    action: function() {
    //Login
    page.evaluate(function() {
      var theForm = document.forms['Form1'];
      theForm.submit();
      return;

    });
  }}, 
 
    {
        title:"processing html ...",
        action: function() {
          page.evaluate(function() {
            outHTML = document.querySelectorAll('html')[0].outerHTML;
            var i = 0;
            while(document.getElementById("DgQuartier_Codepostal_Id_quartier_"+i)){
                console.log(
                    document.getElementById("DgQuartier_Codepostal_Id_quartier_"+i).innerHTML 
                    + " : " + 
                    document.getElementById("DgQuartier_Codepostal_id_codepostal_"+i).innerHTML
                );
                i++;
            }
        });
    }
  },
  {
    title: "end",
    action: "null"
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex].action == "function") {
    console.log("step : " + steps[testindex].title);
    steps[testindex].action();
    testindex++;
  }

  if (typeof steps[testindex].action != "function") {
    console.log("Scraping complete!");
    clearInterval(interval);
  }
}, 50);