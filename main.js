$(function(){

    $('.fa-search').click(function(){

        if($('#search').val()==''){
            alert('fields cannot be empty')
        } else{
            $.ajax({
                url: "https://api.covid19api.com/summary",
                type:"GET", 
                error: function(err){
                    console.log(err)
                },
                success:function(response){
                    var global = response['Global']
                    var countries = response['Countries'];
                    // console.log(response['Global'])
                     for(i=0;i<countries.length;i++){
                        //  console.log(countries[i]['TotalConfirmed'])
                        // console.log(countries[i]['Slug'])
                        if(countries[i]['Slug']== $('#search').val() || countries[i]['Country']== $('#search').val() || countries[i]['CountryCode']== $('#search').val()){
                            $('#TCC').text(countries[i]['TotalConfirmed']);
                            $('#TRC').text(countries[i]['TotalRecovered']);
                            $('#TCD').text(countries[i]['TotalDeaths']);
                            $('#CCC').text(countries[i]['NewConfirmed']);
                            $('#CRC').text(countries[i]['NewRecovered']);
                            $('#CCD').text(countries[i]['NewDeaths']);

                            var ctx = document.getElementById('myChart').getContext('2d');
                            var myChart = new Chart(ctx, {
                                type: 'pie',
                                data: {
                                    labels: ['Total Recovered Cases', 'Total Confirmed Deaths'],
                                    datasets: [{
                                        label: 'Recovered Cases vs Comfirmed Death',
                                        data: [countries[i]['TotalRecovered'], countries[i]['TotalDeaths']],
                                        backgroundColor: [
                                            'rgb(97, 223, 160,0.7)',
                                            'rgb(221, 78, 34, 0.7)',
                                        ],
                                        borderColor: [
                                            'rgba(0, 0, 0, 1)',
                                            'rgba(0, 0, 0, 1)',
                                        ],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            }
                                        }]
                                    }
                                }
                            });
                        }
                        
                     }
                     
                },
                beforeSend:function(){
                    // console.log('Loading....');
                    $('.fa-virus').css({'display':'block'})
                },
                complete:function(){
                    // console.log('Data Received successfully....');   
                    $('.fa-virus').css({'display':'none'})

                }
            })
        }
        
    }) 


    $.ajax({
        url: "https://api.covid19api.com/summary",
        type:"GET", 
        error: function(err){
            console.log(err)
        },
        success: function (response) {
            var global = response['Global']
            var countries = response['Countries'];
            var view = ``
            // console.log(response['Global'])
            var warning = `<span style="color:red">Corona Virus is REAL!!!</span> protect yoursefl by: observing social
            distances - avoid touching your eyes, nose,mouth and practice good hygiene.</i>`
            for (i = 0; i < countries.length; i++) {
                //  console.log(countries[i]['TotalConfirmed'])
                // console.log(countries[i]['Slug'])
                view += `
                `+ countries[i]['Slug'] + `  (<span style="color:blue">Recorded</span>: ` + countries[i]['TotalConfirmed'] + `,<span
                style="color:green">Recovered</span>:`+ countries[i]['TotalRecovered'] + `, <span style="color:red">Death</span>:` + countries[i]['TotalDeaths'] + `
                `
                
            }
             $('#warning').html(warning)
             $('#globalUp').html(view)

        },
        
    })

    

    





})

