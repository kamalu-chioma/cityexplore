import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OpenAiResult } from '../model/open-ai';

@Injectable({
  providedIn: 'root'
})
export class OpenAiMapService {
  http = inject(HttpClient)

  getPointsOfInterests(city: string, description = '') {
    return this.http.post<OpenAiResult>("https://api.openai.com/v1/chat/completions", {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an assistant providing geographic and tourist information. When you are given a city name and a description of what the user wants to do, return a JSON with the coordinates of the city and a list of at least 5  related points of interest, including for each the name and coordinates. I also want to know for each point of interest why it's cool (the description field). Reply only with JSON, without additional text.
            The JSON build so structured:

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
            }`
          },
          {
            role: 'user',
            content: `City: ${city}\nDescription: ${description}`
          }
        ],
        temperature: 0.7

      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${environment.OPEN_AI_KEY}`,
        },
      })

  }
}
