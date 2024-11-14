export interface OpenAiResult {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint?: any;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: Prompttokensdetails;
  completion_tokens_details: Completiontokensdetails;
}

export interface Completiontokensdetails {
  reasoning_tokens: number;
  accepted_prediction_tokens: number;
  rejected_prediction_tokens: number;
}

export interface Prompttokensdetails {
  cached_tokens: number;
}

export interface Choice {
  index: number;
  message: Message;
  logprobs?: any;
  finish_reason: string;
}

export interface Message {
  role: string;
  content: string;
  refusal?: any;
}


export interface CustomAnswer {
  city: string;
  coordinates: Coordinates;
  points_of_interest: Pointsofinterest[];
}

export interface Pointsofinterest {
  name: string;
  description: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
