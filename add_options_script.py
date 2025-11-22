#!/usr/bin/env python3
"""
Script to add missing options to functional questions
"""

# Template options for each type of question
option_templates = {
    'opinion': {
        22: {
            'A': "I'm sure I can help",
            'B': "I might not have enough",
            'C': "Let me think about it",
            'D': "That's impossible"
        },
        23: {
            'A': "That sounds boring",
            'B': "That's an excellent idea",
            'C': "I don't like that",
            'D': "Maybe later"
        },
        24: {
            'A': "I'm not sure",
            'B': "That won't work",
            'C': "I am happy to do that",
            'D': "I refuse to do that"
        },
        25: {
            'A': "You should buy your own printer",
            'B': "Why don't you use my printer?",
            'C': "I won't let you use it",
            'D': "That's not my problem"
        },
        26: {
            'A': "I need to ask permission",
            'B': "You can just take them",
            'C': "I was wondering if I could borrow them",
            'D': "No, you can't use them"
        },
        27: {
            'A': "No way!",
            'B': "I appreciate the offer, but I must decline",
            'C': "Maybe next time",
            'D': "I hate that idea"
        },
        28: {
            'A': "That sounds fun!",
            'B': "I wish I could, but I have another engagement",
            'C': "I don't want to",
            'D': "Too tired for that"
        },
        29: {
            'A': "We shouldn't call them",
            'B': "Let's not bother",
            'C': "What if we try calling the supplier again?",
            'D': "I refuse to call"
        },
        30: {
            'A': "We should definitely",
            'B': "We could always",
            'C': "We must",
            'D': "We can't"
        },
        31: {
            'A': "You've completely missed the point",
            'B': "You've hit the nail on the head",
            'C': "That doesn't make sense",
            'D': "You're way off"
        },
        32: {
            'A': "I believe",
            'B': "I reckon",
            'C': "I think",
            'D': "I suppose"
        },
        33: {
            'A': "I hope",
            'B': "I doubt it",
            'C': "I'm certain",
            'D': "That will never happen"
        },
        34: {
            'A': "I completely agree",
            'B': "I see your point, but it covers the syllabus thoroughly",
            'C': "You're absolutely wrong",
            'D': "That book is terrible"
        },
        35: {
            'A': "surprise",
            'B': "anger",
            'C': "disappointment",
            'D': "joy"
        },
        36: {
            'A': "I totally agree",
            'B': "I couldn't disagree more",
            'C': "That's perfect",
            'D': "I love the old system"
        },
        37: {
            'A': "Obviously this is the solution",
            'B': "It would seem that this might be a possibility",
            'C': "Definitely this is wrong",
            'D': "Clearly this is right"
        },
        38: {
            'A': "That makes sense",
            'B': "No way!",
            'C': "I believe you",
            'D': "That's interesting"
        },
        39: {
            'A': "but I disagree",
            'B': "and therefore we should start now",
            'C': "however, that's not good",
            'D': "but we need more time"
        },
        40: {
            'A': "I agree with that",
            'B': "That's reasonable",
            'C': "Totally!",
            'D': "I think so too"
        },
        41: {
            'A': "I'll do it right now",
            'B': "I'm afraid I'm swamped. Would that be acceptable later this week?",
            'C': "I can't help",
            'D': "I'm too busy forever"
        },
        42: {
            'A': "I'd love to help!",
            'B': "I have an important appointment",
            'C': "I wish I could, but",
            'D': "I refuse completely"
        },
        43: {
            'A': "If you were me",
            'B': "In your position",
            'C': "If I were you",
            'D': "From my experience"
        },
        44: {
            'A': "have you tried",
            'B': "why don't you try",
            'C': "you should do",
            'D': "I suggest you"
        },
        45: {
            'A': "that sounds reasonable",
            'B': "I appreciate the urgency, but",
            'C': "I'll do it immediately",
            'D': "that's perfect timing"
        }
    }
}

print("Option templates created for all questions")
print("Total questions with options:", len(option_templates['opinion']))