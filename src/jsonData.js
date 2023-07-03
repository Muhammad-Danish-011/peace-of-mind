export const jsonData = {

    "showQuestionNumbers": "off",
    "title": "Mental Health Intake Form",
    "description": "It's okay, not to be okay.",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "expression",
        "name": "Note",
        "title": "Note:",
        "description": "By participating in this survey, you will play a vital role in helping us understand your needs, all you data will remain private and confidential."
       },
       {
        "type": "checkbox",
        "name": "Are you currently",
        "title": "Are you currently",
        "isRequired": true,
        "validators": [
         {
          "type": "expression"
         }
        ],
        "choices": [
         "Working",
         "Student",
         "Unemployed",
         "Retired",
         "Disabled"
        ],
        "maxSelectedChoices": 1
       },
       {
        "type": "checkbox",
        "name": "Are you currently2",
        "title": "Are you currently",
        "isRequired": true,
        "validators": [
         {
          "type": "expression"
         }
        ],
        "choices": [
         "Engaged",
         "Married",
         "Divorced",
         "Single",
         "Widowed"
        ],
        "maxSelectedChoices": 1
       },
       {
        "type": "boolean",
        "name": "Do you have any children",
        "visibleIf": "{Are you currently2} = ['Married']",
        "title": "Do you have any children",
        "requiredIf": "{Are you currently2} = ['Married']",
        "validators": [
         {
          "type": "expression"
         }
        ]
       },
       {
        "type": "text",
        "name": "Primary Care Physician",
        "title": "Primary Care Physician"
       },
       {
        "type": "text",
        "name": "Current Therapist / Counselor",
        "title": "Current Therapist / Counselor"
       },
       {
        "type": "text",
        "name": "Therapist's Phone Number",
        "useDisplayValuesInDynamicTexts": false,
        "title": "Therapist's Phone Number",
        "validators": [
         {
          "type": "numeric"
         }
        ],
        "inputType": "tel",
        "size": 11,
        "autocomplete": "tel",
        "maxLength": 11,
        "placeholder": "0331-1111111"
       },
       {
        "type": "comment",
        "name": "Please list the problem(s) which you are seeking help?",
        "title": "Please list the problem(s) which you are seeking help?",
        "isRequired": true,
       },
       {
        "type": "checkbox",
        "name": "Current Symptoms",
        "title": "Current Symptoms",
        "isRequired": true,
        "choices": [
         "Depressed Mood",
         "Excessive Worry",
         "Avoidance",
         "Anxiety Attacks",
         "Racing thoughts",
         "Impulsivity",
         "Decreased need of sleep"
        ],
        "showNoneItem": true,
        "showSelectAllItem": true,
        "maxSelectedChoices": 7
       },
       {
        "type": "boolean",
        "name": "Have you ever had feelings or thoughts that you didn't want to live?",
        "title": "Have you ever had feelings or thoughts that you didn't want to live?",
        "isRequired": true,
        "labelTrue": "No",
        "labelFalse": "Yes"
       },
       {
        "type": "boolean",
        "name": "Do you currently feel that you don't want to live?",
        "title": "Do you currently feel that you don't want to live?",
        "isRequired": true,
        "labelTrue": "No",
        "labelFalse": "Yes"
       },
       {
        "type": "dropdown",
        "name": "How often do you have these thoughts?",
        "title": "How often do you have these thoughts?",
        "isRequired": true,
        "choices": [
         "Sometimes",
         {
          "value": "Manytime",
          "text": "Manytime"
         },
         "Every time",
         "Never"
        ]
       },
       {
        "type": "boolean",
        "name": "Do you feel hopeless and/or worthless?",
        "title": "Do you feel hopeless and/or worthless?",
        "isRequired": true,
        "labelTrue": "No",
        "labelFalse": "Yes"
       },
      ],
      "title": "Page 1",
      "description": "Personal History"
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "boolean",
        "name": "Outpatient Treatment",
        "title": "Outpatient Treatment"
       },
       {
        "type": "boolean",
        "name": "Psychiatric Hospitalization",
        "title": "Psychiatric Hospitalization"
       },
       {
        "type": "comment",
        "name": "Do you have any allergies?",
        "title": "Do you have any allergies?",
       },
       {
        "type": "comment",
        "name": "Current Medical Problems",
        "title": "Current Medical Problems"
       },
       {
        "type": "comment",
        "name": "Past medical problems, non-psychiatric hospitalization, or surgeries?",
        "title": "Past medical problems, non-psychiatric hospitalization, or surgeries?"
       },
       {
        "type": "boolean",
        "name": "Any medications?",
        "title": "Any medications?",
        "isRequired": true
       },
       {
        "type": "comment",
        "name": "List down the medications",
        "visibleIf": "{Any medications?} = true",
        "title": "List down the medications"
       },
       {
        "type": "checkbox",
        "name": "Has anyone in your family been diagnosed with or treated for:",
        "title": "Has anyone in your family been diagnosed with or treated for:",
        "choices": [
         "Bipolar disorder",
         "Anxiety",
         "Suicide",
         "Depression",
         "Anger",
         "Schizophrenia",
         "Post-traumatic stress",
         "Alcohol abuse",
         "Other"
        ],
        "showNoneItem": true,
        "showSelectAllItem": true,
        "maxSelectedChoices": 9
       }
      ],
      "title": "Page 2",
      "description": "Psychiatric History:"
     }
    ],
    "showPageTitles": false,
    "startSurveyText": "Next",
    "firstPageIsStarted": true
   }