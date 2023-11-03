const express = require('express');
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const API_KEY = process.env.API_KEY;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const chatApi = (req, res) => {
    let question = req.query.question;
    client.generateText({
        // required, which model to use to generate the result
        model: 'models/text-bison-001',
        // optional, 0.0 always uses the highest-probability result
        temperature: 0.7,
        // optional, how many candidate results to generate
        candidateCount: 1,
        // optional, number of most probable tokens to consider for generation
        top_k: 40,
        // optional, for nucleus sampling decoding strategy
        top_p: 0.95,
        // optional, maximum number of output tokens to generate
        max_output_tokens: 1024,
        // optional, sequences at which to stop model generation
        stop_sequences: [],
        // optional, safety settings
        safety_settings: [{
            "category": "HARM_CATEGORY_DEROGATORY",
            "threshold": 1
        }, {
            "category": "HARM_CATEGORY_TOXICITY",
            "threshold": 1
        }, {
            "category": "HARM_CATEGORY_VIOLENCE",
            "threshold": 2
        }, {
            "category": "HARM_CATEGORY_SEXUAL",
            "threshold": 2
        }, {
            "category": "HARM_CATEGORY_MEDICAL",
            "threshold": 2
        }, {
            "category": "HARM_CATEGORY_DANGEROUS",
            "threshold": 2
        }],
        prompt: {
            // optional, preamble context to prime responses
            context: "Respond to Medical.",
            // Optional. Examples for further fine-tuning of responses.
            examples: [
                {
                    input: { content: "Are Short Workouts Worth It?" },
                    output: {
                        content:
                            `Yes. Longer is better, but you can get by with quick bouts of activity when that’s all you have time for. The CDC suggests 150 minutes of moderate-intensity aerobic activity each week (like walking or biking at a medium-fast pace), plus two sessions of muscle-strengthening exercise. Several 10- minute bursts of exercise each day can get you to this goal and help keep you fit.`,
                    },
                    input: { content: "Sugar or High Fructose Corn Syrup?" },
                    output: {
                        content:
                            `High-fructose corn syrup, which does come from corn, gets a bad rap. But your body processes it almost the same way it does “table” or “regular” sugar, which is made from cane or beets. Your best bet is to go easy on both. High amounts of any added sugar can lead to weight gain and problems like high blood pressure, type 2 diabetes, and heart disease.`,
                    },
                    input: { content: "How do you Manage Stressful Situations?" },
                    output: {
                        content:
                            `I think I can manage stressful situations quite well. First, I analyze the situation to see what things are under my control and what I can get into control right away. Then I create my strategy to get things in order. Usually, when I feel too stressed, I listen to music to calm my nerves.`,
                    },
                },
            ],
            // Required. Alternating prompt/response messages.
            text: question,
        },
    })
    .then(result => {
        result.forEach(function (d1) {
            if (d1 != null) {
                d1.candidates.forEach(function (d2) {
                    res.send(d2.output);
                })
            }
        })
    });
};

module.exports = chatApi;