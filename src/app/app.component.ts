import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DataService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app works!';
  messages=["Advocate Asssitant","IS360Bot","ServiceNow"]
  isDarkTheme: boolean = false;
  botSelected: boolean = false;
  selectedAgent:any;
  errorMessage: String;
  agents=[];
  chatconversation=[];
  botText='';
  filteredItems=[];
  toolBarText='';
  public avatarDataCircle1: any = {
                size: 100,
        //        background: '#F39C12', // by default it will produce dynamic colors
                fontColor: '#FFFFFF',
                border: "2px solid #d3d3d3",
                isSquare: false,
                text: "Rajan Gunasekaran"
            };

    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient,private _dataService: DataService){}

    ngOnInit(): void {
      this._dataService.getStatus().then(
        statusData => {
          var modelsMap = this.getModelMap(statusData.available_models);
          this._dataService.listAgents().then(
            agentsInfo => {
                   for (var i=0;i<agentsInfo.length;i++){
                   //get model for each agent
                   if(modelsMap.get(agentsInfo[i].agent_name) != undefined){
                     //sort the array of dates
                     if(modelsMap.get(agentsInfo[i].agent_name).length>1){
                       modelsMap.get(agentsInfo[i].agent_name).sort(function(a,b){return b.modelCreatedDate-a.modelCreatedDate;});
                       agentsInfo[i].model = modelsMap.get(agentsInfo[i].agent_name)[0].modelName;
                     }else
                        agentsInfo[i].model = modelsMap.get(agentsInfo[i].agent_name)[0].modelName;
                   }
                 }
                 this.agents=agentsInfo;
                 this.assignCopy();
               }, err => {
               });
        },
        error =>  this.errorMessage = <any>error
      );
      //copy to filtered list.
   }

   selectBot(agent){
     console.log("Selectee agent "+agent);
     this.botSelected=true;
     this.selectedAgent=agent;
     this.toolBarText='Chatting with Agent';
   }
   onEnter(value: string) {
     //post message
      this.chatconversation.push({senderId:'user',value:value});
      this._dataService.getBotResponse(value,this.selectedAgent.model).then(response => {
        this.chatconversation.push({senderId:this.selectedAgent.agent_id,value:response.response_text})
      })
    }

    assignCopy(){
       this.filteredItems = Object.assign([], this.agents);
    }
    filterItem(value){
      console.log(this.filteredItems);
       if(!value) this.assignCopy(); //when nothing has typed
       this.filteredItems = Object.assign([], this.agents).filter(
          item => item['agent_name'].toLowerCase().indexOf(value.toLowerCase()) > -1
       )
    }
   //construct model names with their dates.
   getModelMap(allModelsArray){
     var modelsMap = new Map();
      for(var i=0;i<allModelsArray.length;i++){
        var name = allModelsArray[i].substring(allModelsArray[i].lastIndexOf("/") + 1);
        var agentName= name.substring(0,name.lastIndexOf("_"));
        var timestamp= allModelsArray[i].substring(allModelsArray[i].lastIndexOf("_") + 1);
        var modelCreatedDate = new Date(timestamp.substring(0,4), timestamp.substring(4,6)-1,
                              timestamp.substring(6,8), timestamp.substring(9,11),
                              timestamp.substring(11,13), timestamp.substring(13,15),0)

        if(modelsMap.get(agentName) != undefined){
          modelsMap.get(agentName).push({modelCreatedDate:modelCreatedDate,modelName:name});
        }else{
          var modelsArr=[];
          modelsArr.push({modelCreatedDate:modelCreatedDate,modelName:name});
          modelsMap.set(agentName,modelsArr);
        }
      }
      return modelsMap
   }
}
