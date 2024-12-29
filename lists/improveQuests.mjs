import quests from "./quests.mjs"
import fs from 'fs'

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: "",
});


// quests is a list of strings, iterate over the list in batches of 10

const improveQuests = async () => {
  const improvedQuests = []
  for (let i = 250; i < quests.length; i += 5) {
    const batch = quests.slice(i, i + 5
    )
    const newAndImprovedBatch = await improveBatch(batch)
    console.log("batch done")
    console.log(newAndImprovedBatch[0])
    improvedQuests.push(...newAndImprovedBatch)
    fs.writeFileSync('improvedQuests'+i+'.json', JSON.stringify(improvedQuests))
  }
  
  // write the improved quests to a file
  fs.writeFileSync('improvedQuests.json', JSON.stringify(improvedQuests))
}

const improveBatch = async (batch) => {
  let message
  try { 
    message = await client.messages.create({
      max_tokens: 6144,
      messages: [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "I am going to show you a list of quests. Your job is to improve them. You must use do these 3 things for each one. You can do additional improvements if you wish: 1. If the Objective has circular logic, confuses one party for another, or simply doesnt make sense, its bad. Rewrite it entirely. 2. If the objective does not explain ALL missing information, it should be expanded to include all information. All \"discover\", \"uncover\", etc should be fully explained what the resulting reveal would be. 3. Remove the sections for Competing Interests, Location, and Motivation. Add Additional Information section that can include these types of things or go into other details to flesh out the quest/world/etc. The Additional Details section should only contain new information."
                },
                {
                    "type": "text",
                    "text": "Your response MUST be in valid json format. Each quest is a single string (broken up by newlines and capitalized section headings) and the overall response is an array. It should strictly begin with a [, end with ], and each quest should be surrounded by \"\","
                },
                {
                    "type": "text",
                    "text": "Here is the list of quests: " + JSON.stringify(batch)
                },
            ],
        }
      ],
      model: "claude-3-5-sonnet-20241022",
      // claude-3-haiku-20240307 for faster and cheaper
      // claude-3-5-sonnet-20241022 for better results
    });
    return JSON.parse(message.content[0].text)
  }
  catch (e) {
    console.log(e)
    console.log('--------------------------------------------------------------------------------')
    console.log(message)
    console.log('--------------------------------------------------------------------------------')
    return improveBatch(batch)
  }
}


improveQuests()