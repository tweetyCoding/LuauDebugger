// Luau Review Analyzer
// Frontend prototype analyzer


function analyze(){


    const code = document.getElementById("code").value;


    let score = 100;

    let issues = [];



    /*
        BASIC CODE CHECKS
    */


    // Empty code check

    if(code.trim().length === 0){

        document.getElementById("score").innerHTML = "0";

        document.getElementById("issues").innerHTML = `

        <div class="issue error">

        🔴 No code detected

        <br>

        Paste a Luau script first.

        </div>

        `;

        return;

    }




    /*
        LUAAU BEST PRACTICES
    */



    // wait() detection

    if(code.includes("wait(")){


        score -= 10;


        issues.push({

            type:"warning",

            title:"⚠ wait() detected",

            message:
            "Replace wait() with task.wait(). task.wait() is more accurate and recommended by Roblox."

        });


    }





    // Infinite loop detection


    if(code.includes("while true do")){


        score -= 15;


        issues.push({

            type:"error",

            title:"🔴 Infinite loop detected",

            message:
            "while true do can freeze your game if it has no break condition or yield."

        });


    }






    // Strict mode check


    if(!code.includes("--!strict")){


        score -= 5;


        issues.push({

            type:"warning",

            title:"⚠ Missing --!strict",

            message:
            "Enable Luau strict mode to catch type errors earlier."

        });


    }






    // Spawn detection


    if(code.includes("spawn(")){


        score -= 5;


        issues.push({

            type:"warning",

            title:"⚠ Old threading method",

            message:
            "Use task.spawn() instead of spawn()."

        });


    }






    // Deprecated delay


    if(code.includes("delay(")){


        score -= 5;


        issues.push({

            type:"warning",

            title:"⚠ Deprecated delay()",

            message:
            "Replace delay() with task.delay()."

        });


    }







    // RemoteEvent security


    if(code.includes("OnServerEvent")){


        if(!code.includes("player")){


            score -= 10;


            issues.push({

                type:"error",

                title:"🔴 Possible RemoteEvent security issue",

                message:
                "Validate the player and arguments received from clients."

            });


        }


    }






    // Long script check


    let lines = code.split("\n").length;


    if(lines > 300){


        score -= 5;


        issues.push({

            type:"warning",

            title:"⚠ Large script",

            message:
            "Consider splitting this script into ModuleScripts."

        });


    }







    /*
        GENERATE REPORT
    */



    if(score < 0){

        score = 0;

    }



    document.getElementById("score").innerHTML =
    score;





    let output = "";



    if(issues.length === 0){


        output = `

        <div class="issue">

        ✅ No problems found!

        <br><br>

        Your Luau code looks clean.

        </div>

        `;


    }

    else{


        issues.forEach(issue =>{


            output += `

            <div class="issue ${issue.type}">

            <strong>
            ${issue.title}
            </strong>

            <br><br>

            ${issue.message}

            </div>

            `;


        });


    }



    document.getElementById("issues").innerHTML =
    output;



}