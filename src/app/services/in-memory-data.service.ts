import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb(): {} | Observable<{}> | Promise<{}> {
    const questionnaire = [
      {
        "id": 2,
        "name": "MUSCULOSKELETAL IMAGING",
        "description": "",
        "published": true,
        "exams": [
          {
            "id": 53,
            "weight": 0,
            "parent": 1,
            "label": "SPINE"
          },
          {
            "id": 65,
            "weight": 0,
            "parent": 1,
            "label": "BREAST"
          },
          {
            "id": 219,
            "weight": 0,
            "parent": 2,
            "label": "HEAD / ENT"
          },
          {
            "id": 233,
            "weight": 1,
            "parent": 2,
            "label": "NECK"
          }
        ],
        "sections": [
          {
            "id": 6,
            "name": "MSK Questions",
            "description": "",
            "weight": 0,
            "fields": [
              {
                "id": 12,
                "name": "Date of Injury (MM/DD/YYYY)",
                "description": "",
                "type": "question",
                "answer_type": "date",
                "required": false,
                "weight": 0,
                "options": []
              },
              {
                "id": 11,
                "name": "Did you have a recent injury?",
                "description": "",
                "type": "question",
                "answer_type": "radios",
                "required": false,
                "weight": 1,
                "options": [
                  {
                    "id": 4,
                    "name": "YES",
                    "weight": 0
                  },
                  {
                    "id": 5,
                    "name": "NO",
                    "weight": 1
                  },
                  {
                    "id": 16,
                    "name": "Both",
                    "weight": 2
                  }
                ]
              },
              {
                "id": 13,
                "name": "Do you have a mass?",
                "description": "",
                "type": "question",
                "answer_type": "radios",
                "required": false,
                "weight": 2,
                "options": [
                  {
                    "id": 6,
                    "name": "Yes",
                    "weight": 0
                  },
                  {
                    "id": 7,
                    "name": "No",
                    "weight": 1
                  }
                ]
              },
              {
                "id": 14,
                "name": "Did you play sports professionally/for school?",
                "description": "",
                "type": "question",
                "answer_type": "radios",
                "required": false,
                "weight": 3,
                "options": [
                  {
                    "id": 8,
                    "name": "Yes",
                    "weight": 0
                  },
                  {
                    "id": 9,
                    "name": "No",
                    "weight": 1
                  }
                ]
              }
            ]
          },
          {
            "id": 2,
            "name": "Primary insurance information",
            "description": "",
            "weight": 0,
            "fields": [
              {
                "id": 8,
                "name": "Insurance ID",
                "description": "",
                "type": "question",
                "answer_type": "text",
                "required": false,
                "weight": 0,
                "options": []
              },
              {
                "id": 9,
                "name": "Insurance carrier",
                "description": "",
                "type": "question",
                "answer_type": "text",
                "required": false,
                "weight": 1,
                "options": []
              }
            ]
          },
          {
            "id": 3,
            "name": "Secondary insurance information",
            "description": "",
            "weight": 0,
            "fields": [
              {
                "id": 9,
                "name": "Insurance carrier",
                "description": "",
                "type": "question",
                "answer_type": "text",
                "required": false,
                "weight": 0,
                "options": []
              },
              {
                "id": 8,
                "name": "Insurance ID",
                "description": "",
                "type": "question",
                "answer_type": "text",
                "required": false,
                "weight": 1,
                "options": []
              }
            ]
          }
        ]
      }
    ];
    return {questionnaire};
  }
}
