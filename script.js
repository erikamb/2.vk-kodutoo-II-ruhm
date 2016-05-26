(function(){
"use strict";

  var temperature = function(){

    if(temperature.instance){
      return temperature.instance;
    }
    temperature.instance = this;
    this.counter = 0;
    this.sum = 0;
    this.init();
  };

  window.temperature = temperature;

  temperature.prototype = {

    init: function(){
      if(localStorage.getItem("counter") == null){
              localStorage.setItem("counter", JSON.stringify(this.counter));
      }
      this.loadLocal();
      this.bindEvents();


    },
  bindEvents: function(){
    var app = this;
    $('.button1').click(function(){
      console.log($('input').val());
      $('div').append("<p>"+parseInt($('input').val())+"</p>");
      app.sum += parseInt($('input').val());
      app.counter++;
      app.saveLocal();
      console.log(app.counter);
      });
      $('.button2').click(function(){
        app.avgTemp();
      });
      $('.button3').click(function(){
        app.deleteLocal();
      });
  },

  saveLocal: function(){
    localStorage.setItem("temp"+this.counter, JSON.stringify($('input').val()));
    localStorage.setItem("counter", JSON.stringify(this.counter));
    localStorage.setItem("sum", JSON.stringify(this.sum));
  },

  loadLocal: function(){
      this.counter = JSON.parse(localStorage.getItem("counter"));
      for(var i = 0; i<=this.counter; i++){
        var fish =JSON.parse(localStorage.getItem("temp"+i));
        $('div').append("<p>"+fish+"°C</p>");
      }
  },
  avgTemp: function(){
    this.sum = JSON.parse(localStorage.getItem("sum"));
    var avg = this.sum/this.counter;
    $('div').append("<p>Keskmine Temperatuur: "+avg+"°C</p>");
  },
  deleteLocal: function(){
    for(var i = 0; i<=this.counter; i++){
      	localStorage.removeItem("temp"+i);
    };
    $("div").empty();
    this.counter = 0;
    localStorage.removeItem("counter");
  }
  }
    window.onload = function(){
    var app = new temperature();
  };

})();
