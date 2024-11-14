import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { OpenAiResult } from '../model/open-ai';

@Injectable()
export class OpenAiMockService {
  getPointsOfInterests(city: string, description = '') {
    return of(mock)
  }
}

const mock: OpenAiResult = {
  "id": "chatcmpl-AQNjt5bRfUwraakIRwotHJcPo2DO2",
  "object": "chat.completion",
  "created": 1730851145,
  "model": "gpt-3.5-turbo-0125",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\n  \"city\": \"Milano\",\n  \"coordinates\": {\n    \"latitude\": 45.464203,\n    \"longitude\": 9.189982\n  },\n  \"points_of_interest\": [\n    {\n      \"name\": \"Lambrate Skatepark\",\n      \"description\": \"Lambrate Skatepark is a popular spot for skateboarders in Milan, offering ramps, rails, and a vibrant skate community.\",\n      \"coordinates\": {\n        \"latitude\": 45.483176,\n        \"longitude\": 9.251081\n      }\n    },\n    {\n      \"name\": \"Area 56 Skatepark\",\n      \"description\": \"Area 56 Skatepark is an indoor skatepark in Milan, providing various obstacles and ramps for skaters to enjoy all year round.\",\n      \"coordinates\": {\n        \"latitude\": 45.473021,\n        \"longitude\": 9.218081\n      }\n    },\n    {\n      \"name\": \"Cascina Torchiera Skatepark\",\n      \"description\": \"Cascina Torchiera Skatepark is a modern outdoor skatepark in Milan, suitable for skaters of all levels with its diverse terrain.\",\n      \"coordinates\": {\n        \"latitude\": 45.485476,\n        \"longitude\": 9.109717\n      }\n    },\n    {\n      \"name\": \"Parco Lambro Skatepark\",\n      \"description\": \"Parco Lambro Skatepark is a spacious skatepark in Milan, surrounded by greenery and providing a peaceful environment for skaters.\",\n      \"coordinates\": {\n        \"latitude\": 45.466155,\n        \"longitude\": 9.268392\n      }\n    },\n    {\n      \"name\": \"Giambellino Skatepark\",\n      \"description\": \"Giambellino Skatepark is a community-driven skatepark in Milan, offering a creative space for skaters to practice and connect with others.\",\n      \"coordinates\": {\n        \"latitude\": 45.446684,\n        \"longitude\": 9.139414\n      }\n    }\n  ]\n}",
        "refusal": null
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 185,
    "completion_tokens": 422,
    "total_tokens": 607,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "system_fingerprint": null
}
