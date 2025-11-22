/**
 * Writing Topics Data Structure
 * Organized by grade level (10, 11, 12) with essay topics and model answers
 */

export interface WritingTopic {
  id: number;
  title: string;
  grade: number;
  type: 'argumentative' | 'descriptive' | 'narrative' | 'expository' | 'persuasive';
  wordCount?: number;
  prompt: string;
  modelAnswer: string;
  keyPoints?: string[];
  tips?: string[];
}

export interface WritingGradeData {
  grade: number;
  title: string;
  topics: WritingTopic[];
}

export const writingTopicsData: WritingGradeData[] = [
  {
    grade: 10,
    title: "Grade 10 Writing Topics",
    topics: [
      {
        id: 1,
        title: "Keeping Fit / Healthy Lifestyle",
        grade: 10,
        type: "argumentative",
        prompt: "Write an essay about keeping fit and maintaining a healthy lifestyle. Discuss effective ways to stay fit and examine the harmful effects of unhealthy eating habits.",
        modelAnswer: `Keeping fit and maintaining a healthy lifestyle is the foundation of a happy and fulfilling life. In today's fast-paced world, where fast food and sedentary habits dominate, prioritizing our health has never been more crucial. This essay will explore effective ways to stay fit while examining the harmful effects of unhealthy eating habits.

There are several proven strategies to maintain physical fitness and overall wellness. First and foremost, consuming nutritious, balanced meals provides our bodies with essential vitamins and minerals needed for optimal functioning. Drinking adequate water daily—at least eight glasses—keeps our bodies hydrated and helps flush out toxins. Regular physical exercise, whether through sports, gym workouts, or even brisk walking, strengthens muscles and improves cardiovascular health. Additionally, getting sufficient sleep of 7-9 hours each night allows our bodies to repair and rejuvenate, which is vital for mental clarity and physical energy.

Conversely, the rising consumption of fast food poses serious threats to our health. These meals are typically high in saturated fats, sodium, and calories, leading directly to obesity and related diseases such as diabetes and heart conditions. Moreover, fast food lacks essential nutrients, causing malnutrition even in overweight individuals. The convenience of these meals also promotes laziness and reduces motivation for physical activity. Unlike home-cooked meals prepared with fresh ingredients, fast food often contains preservatives and artificial additives that harm our digestive systems.

In conclusion, maintaining fitness requires conscious effort and discipline in our daily choices. By embracing healthy eating habits, staying active, and avoiding processed foods, we can significantly improve our quality of life. The benefits extend beyond physical appearance to include mental well-being, increased energy, and longevity. Let us commit to these positive changes for a healthier future.`,
        keyPoints: [
          "Importance of balanced nutrition",
          "Benefits of regular exercise",
          "Harmful effects of fast food",
          "Role of adequate sleep",
          "Water consumption importance"
        ],
        tips: [
          "Use specific examples to support your points",
          "Compare healthy vs unhealthy habits",
          "Include a conclusion that summarizes your main arguments"
        ]
      },
      {
        id: 2,
        title: "Vegetarian Lifestyle",
        grade: 10,
        type: "argumentative",
        prompt: "Discuss the advantages and disadvantages of following a vegetarian lifestyle. Support your arguments with specific examples.",
        modelAnswer: `The vegetarian lifestyle has gained tremendous popularity worldwide as people become more health-conscious and environmentally aware. While many adopt this diet for ethical or medical reasons, it is essential to understand both its advantages and potential drawbacks before making such a significant dietary change. This essay will examine the pros and cons of vegetarianism to help individuals make informed decisions.

A vegetarian diet offers numerous health benefits that cannot be overlooked. Primarily, plant-based foods are rich in essential vitamins, fiber, and antioxidants that strengthen the immune system and protect against chronic diseases like cancer and heart disease. Vegetarians often maintain healthier body weights since their diets are naturally lower in calories and saturated fats. Furthermore, consuming organic vegetables and fruits reduces exposure to harmful chemicals and hormones found in some meat products. Many vegetarians report increased energy levels and improved digestion due to the high fiber content in their meals. From an environmental perspective, vegetarianism reduces carbon footprint and conserves water resources.

However, an improperly planned vegetarian diet can lead to serious nutritional deficiencies. The most critical concern is the lack of complete proteins, iron, vitamin B12, and calcium, which are abundantly found in meat and dairy products. These deficiencies may result in anemia, weakened bones, and compromised immune function. Vegetarian meals can also be more expensive, especially when relying on specialty organic products or supplements. For children and athletes, protein deficiency can severely impact growth, development, and performance. Without careful planning, vegetarians risk malnutrition and related health complications.

In conclusion, while the vegetarian lifestyle offers remarkable health and environmental benefits, it demands careful nutritional planning. The key is balance and education—consulting a dietician ensures all nutritional needs are met. With proper guidance, vegetarianism can be a sustainable and healthy choice for those committed to its principles.`,
        keyPoints: [
          "Health benefits of plant-based diet",
          "Environmental advantages",
          "Potential nutritional deficiencies",
          "Cost considerations",
          "Need for proper planning"
        ],
        tips: [
          "Present both sides fairly",
          "Use specific nutritional examples",
          "Mention the importance of professional guidance"
        ]
      },
      {
        id: 3,
        title: "Respect",
        grade: 10,
        type: "expository",
        prompt: "Explain the importance of respect in our daily lives and how we can show respect to others in different situations.",
        modelAnswer: `Respect is one of the fundamental pillars of human interaction and social harmony. It forms the foundation upon which healthy relationships, communities, and societies are built. Understanding and practicing respect in our daily lives not only benefits others but also enriches our own personal growth and emotional well-being.

Respect manifests in various forms and contexts. At home, we show respect to family members by listening to their opinions, honoring their privacy, and appreciating their efforts. In school, respecting teachers means paying attention during lessons, submitting work on time, and engaging thoughtfully in discussions. For peers, respect involves treating everyone equally regardless of their background, supporting them during difficult times, and celebrating their achievements.

The benefits of practicing respect are profound and far-reaching. When we respect others, we create an environment of trust and safety where people feel valued and understood. This leads to stronger friendships, better collaboration in team settings, and reduced conflicts. Moreover, respectful behavior enhances our reputation and makes us more approachable and likeable to others. It also contributes to personal development by teaching us empathy, patience, and cultural awareness.

Showing respect requires conscious effort and attention to how our words and actions affect others. Simple gestures like saying "please" and "thank you," maintaining appropriate personal space, and listening actively demonstrate respect in everyday interactions. We should also respect different opinions, even when we disagree, and avoid judging others based on stereotypes or assumptions.

In conclusion, respect is not merely a social courtesy but a vital component of meaningful human connections. By incorporating respect into our daily interactions, we contribute to creating a more harmonious and inclusive society where everyone feels valued and understood.`,
        keyPoints: [
          "Definition and importance of respect",
          "Different contexts where respect is needed",
          "Benefits of practicing respect",
          "Ways to show respect",
          "Impact on personal and social development"
        ],
        tips: [
          "Give concrete examples from different life situations",
          "Explain both giving and receiving respect",
          "Connect respect to broader social harmony"
        ]
      },
      {
        id: 4,
        title: "The Importance of Technology in Education",
        grade: 10,
        type: "argumentative",
        prompt: "Discuss how technology has changed education and whether these changes are beneficial or harmful to students.",
        modelAnswer: `Technology has revolutionized the educational landscape, transforming traditional classroom methods into dynamic, interactive learning experiences. While some critics argue that technology distracts from genuine learning, the overwhelming evidence suggests that when implemented thoughtfully, technology enhances education in unprecedented ways.

The integration of technology in education offers numerous advantages that benefit both students and teachers. Digital learning platforms provide access to vast amounts of information instantly, allowing students to explore topics beyond textbook limitations. Interactive educational software makes learning more engaging through games, simulations, and multimedia presentations that cater to different learning styles. Furthermore, online resources enable students to learn at their own pace, review difficult concepts multiple times, and access expert knowledge from renowned institutions worldwide.

Technology also facilitates communication and collaboration among students and educators. Video conferencing tools connect classrooms across continents, enabling cultural exchange and collaborative projects. Learning management systems allow teachers to track student progress, provide immediate feedback, and customize instruction based on individual needs. For students with disabilities, assistive technology has opened doors to educational opportunities that were previously inaccessible.

However, the digital divide presents challenges that cannot be ignored. Not all students have equal access to technology and reliable internet connections, creating disparities in educational opportunities. Additionally, excessive screen time can lead to decreased attention spans, eye strain, and reduced physical activity. There is also concern that over-reliance on technology may diminish fundamental skills like handwriting, mental calculation, and face-to-face communication.

In conclusion, while technology in education requires careful implementation to address potential drawbacks, its benefits far outweigh the challenges. The key lies in maintaining balance—using technology as a tool to enhance, not replace, traditional teaching methods. When properly integrated, technology empowers students with essential 21st-century skills while making learning more accessible, engaging, and effective.`,
        keyPoints: [
          "Enhanced access to information",
          "Interactive and engaging learning tools",
          "Improved communication and collaboration",
          "Addressing the digital divide",
          "Balancing technology with traditional methods"
        ],
        tips: [
          "Provide specific examples of educational technology",
          "Address both benefits and challenges",
          "Propose solutions for potential problems"
        ]
      }
    ]
  },
  {
    grade: 11,
    title: "Grade 11 Writing Topics",
    topics: [
      {
        id: 5,
        title: "Family Gatherings in Modern Society",
        grade: 11,
        type: "expository",
        prompt: "In an era of digital communication and busy schedules, discuss why face-to-face family meetings remain crucial for maintaining strong familial bonds.",
        wordCount: 295,
        modelAnswer: `In our fast-paced contemporary world dominated by instant messaging and virtual connections, the tradition of physical family gatherings has assumed even greater importance. These face-to-face meetings serve as the cornerstone of emotional well-being and cultural continuity, providing irreplaceable benefits that technology simply cannot replicate.

The primary value of family get-togethers lies in their capacity to strengthen close-knit relationships through shared experiences. When relatives gather to celebrate milestones such as birthdays, weddings, or graduation parties, they create touching memories that become the foundation of familial identity. These occasions offer a breathing space from daily pressures, allowing family members to reminisce about cherished moments and swap stories that reinforce their common heritage. Unlike digital communication, physical presence enables the exchange of non-verbal cues—warm embraces, genuine smiles, and empathetic gestures—that convey emotions more powerfully than words.

Furthermore, regular family meetings function as vital forums for discussing problems and exchanging experiences across generations. The eldest members can offer wisdom accumulated over decades, while younger siblings contribute fresh perspectives, creating a dynamic learning environment. This intergenerational dialogue is particularly evident in Kuwaiti customs where families traditionally meet every Friday evening, demonstrating how such gatherings preserve cultural identity while adapting to modern schedules.

Food, invariably central to these celebrations, adds another layer of significance. Preparing and sharing traditional dishes shows hospitality and provides a sensory connection to ancestral roots. As people share their special moments while eating, they reinforce bonds that might otherwise weaken amid the distractions of modern life.

In essence, family gatherings remain an indispensable necessity for societal health. They anchor individuals in a supportive network, transmit cultural values, and ultimately remind us that despite technological advances, human connection remains our most precious resource.`,
        keyPoints: [
          "Strengthening relationships through shared experiences",
          "Intergenerational knowledge transfer",
          "Non-verbal communication importance",
          "Cultural preservation through traditions",
          "Food as a bonding element"
        ],
        tips: [
          "Connect to modern technology context",
          "Use specific cultural examples",
          "Emphasize the irreplaceable nature of face-to-face interaction"
        ]
      },
      {
        id: 6,
        title: "Social Meeting Spaces: Coffee Houses to Diwaniyas",
        grade: 11,
        type: "expository",
        prompt: "Analyze the evolution of social meeting spaces from traditional coffee houses to modern diwaniyas, discussing their cultural significance and changing roles.",
        modelAnswer: `Social meeting spaces have undergone remarkable transformation throughout history, reflecting changes in technology, culture, and social needs. From the traditional coffee houses that once served as centers of intellectual discourse to the modern diwaniyas that continue to foster community bonds, these spaces have consistently adapted while maintaining their fundamental purpose of bringing people together.

Traditional coffee houses, which emerged in the Middle East centuries ago, functioned as vibrant hubs of intellectual and political discourse. These establishments provided opportunities for merchants, scholars, and citizens to engage in spirited debates, share news, and exchange ideas. The coffee house served as an informal university where knowledge was disseminated through conversations, creating an egalitarian space where social status mattered less than the quality of one's thoughts. These venues also facilitated business transactions and cultural exchanges, making them essential components of urban social life.

In Kuwait and other Gulf countries, the evolution led to the development of diwaniyas—traditional reception rooms that have become synonymous with hospitality and male social interaction. Unlike the commercial nature of coffee houses, diwaniyas are typically private spaces where men gather weekly to discuss current events, conduct business, and strengthen social networks. These gatherings maintain the intellectual tradition of their predecessors while incorporating modern conveniences and expanding their cultural significance.

The emergence of digital communication has created new challenges and opportunities for social meeting spaces. While social media and video conferencing have made distant connections easier, they have also highlighted the irreplaceable value of physical presence. Modern malls, co-working spaces, and recreational centers now serve as contemporary versions of these traditional gathering places, offering different amenities while fulfilling the same fundamental need for human connection.

In conclusion, whether in the form of historical coffee houses or modern diwaniyas, social meeting spaces continue to play vital roles in community development and cultural preservation. As society evolves, these spaces adapt their forms while maintaining their essential function as catalysts for meaningful human interaction and social cohesion.`,
        keyPoints: [
          "Historical evolution of social spaces",
          "Cultural and intellectual significance",
          "Adaptation to changing times",
          "Maintaining community bonds",
          "Technology's impact on social gathering"
        ],
        tips: [
          "Trace the historical development",
          "Compare traditional and modern approaches",
          "Analyze cultural significance across different societies"
        ]
      },
      {
        id: 7,
        title: "Environmental Challenges in Kuwait",
        grade: 11,
        type: "descriptive",
        prompt: "Describe the major environmental challenges facing Kuwait today and discuss their impact on the country's future.",
        modelAnswer: `Kuwait faces a complex array of environmental challenges that threaten both its immediate ecosystem and long-term sustainability. As one of the world's leading oil-producing nations, Kuwait's rapid industrial development has come at a significant environmental cost, creating urgent needs for conservation and sustainable practices.

Air pollution stands as one of the most visible and concerning environmental issues. Industrial emissions from oil refineries, power plants, and factories release harmful pollutants into the atmosphere, contributing to respiratory problems among residents and creating smog that often blankets Kuwait City. Vehicle emissions from the country's heavy dependence on automobiles exacerbate this problem, particularly during summer months when temperature inversions trap pollutants close to the ground.

Water scarcity and quality represent equally pressing challenges. Despite abundant oil reserves, Kuwait faces severe water shortages due to its arid climate and lack of natural freshwater sources. The country relies heavily on energy-intensive desalination processes, which not only consume vast amounts of energy but also produce brine discharge that affects marine ecosystems. Groundwater depletion has reached critical levels, with aquifers being pumped faster than they can naturally replenish.

Desertification poses another significant threat to Kuwait's environment. Overgrazing, urbanization, and climate change have led to the degradation of fertile land, creating vast areas of barren terrain that contribute to dust storms. These storms not only affect air quality but also damage agriculture and infrastructure across the region.

Marine pollution, particularly from oil spills and industrial discharge, has severely impacted Kuwait's coastal ecosystems. The Persian Gulf's already stressed marine environment faces additional pressure from shipping traffic and coastal development. Coral reefs, which serve as nurseries for marine life, have suffered considerable damage, affecting fish populations and the broader marine food chain.

In conclusion, Kuwait's environmental challenges require immediate and comprehensive action. The nation's future prosperity depends on implementing sustainable practices, investing in clean technologies, and balancing economic development with environmental protection. Without significant changes, these problems will only intensify, threatening both quality of life and economic stability.`,
        keyPoints: [
          "Air pollution from industrial and vehicle emissions",
          "Water scarcity and desalination challenges",
          "Desertification and land degradation",
          "Marine pollution and ecosystem damage",
          "Need for sustainable development"
        ],
        tips: [
          "Use specific examples of environmental problems",
          "Connect challenges to economic and social impacts",
          "Propose realistic solutions"
        ]
      }
    ]
  },
  {
    grade: 12,
    title: "Grade 12 Writing Topics",
    topics: [
      {
        id: 8,
        title: "Kuwait's Water Management: A Critical Analysis",
        grade: 12,
        type: "argumentative",
        prompt: "Evaluate Kuwait's current water management strategy and propose improvements for ensuring long-term water security.",
        modelAnswer: `Kuwait's water security strategy, built almost exclusively on seawater desalination, represents one of the most resource-intensive approaches to water supply in the world. While this system guarantees potable water availability in an arid climate with no natural freshwater sources, its sustainability is increasingly questionable as energy costs rise and environmental concerns mount. This evaluation examines the strengths and critical weaknesses of current management practices and proposes a pathway toward a more resilient and efficient water future.

The current desalination infrastructure performs its primary function admirably: delivering high-quality drinking water to every resident without interruption. Multi-stage flash (MSF) and multi-effect distillation (MED) plants operate continuously, providing the foundation for Kuwait's modern society. However, this achievement masks fundamental unsustainability across three critical dimensions. First, the system exhibits dangerous energy dependency, with desalination consuming approximately 10-15% of the nation's total electricity production. This directly ties water security to fossil fuel consumption, creating vulnerability to oil price fluctuations and undermining climate commitments by generating substantial carbon emissions. Second, wastewater utilization remains grossly inefficient. While tertiary treatment facilities exist, a significant volume of treated effluent is still discharged into the sea or used for limited applications, never reaching its potential for irrigation, industrial cooling, or groundwater recharge. Third, demand management is virtually non-existent, as Kuwait maintains one of the highest per capita water consumption rates globally—around 450 liters per person daily—indicating a catastrophic failure to address waste through pricing or conservation culture.

Addressing these challenges requires immediate action on three fronts. Energy efficiency must be prioritized through a strategic shift to Reverse Osmosis (RO) technology. Unlike thermal desalination methods, RO uses substantially less energy—approximately 3-4 kWh per cubic meter compared to 15-25 kWh for MSF—by forcing seawater through semi-permeable membranes rather than boiling it. The government should mandate that all future desalination plants utilize RO technology and develop a phased plan to retrofit existing facilities, potentially reducing energy consumption by 40-60% while maintaining water quality.

Simultaneously, Kuwait must maximize its treated wastewater potential through aggressive reuse policies. The Ministry should enact regulations requiring exclusive use of tertiary-treated effluent for all landscaping, agricultural, and industrial cooling applications. This necessitates construction of an independent pipeline network—distinct from the potable water system—to deliver non-potable water across residential areas, parks, and industrial zones. Such infrastructure would immediately reduce the strain on desalinated supply for non-essential uses, preserving premium water for drinking and sanitation while creating a truly circular water economy.

Finally, demand management must become central to water policy. Kuwait should implement a tiered pricing system where a basic allocation of water is provided at subsidized rates, but consumption beyond efficient thresholds faces exponentially increasing charges. This structure would penalize wasteful practices like excessive lawn irrigation and car washing while protecting low-income families. Revenue generated from premium tiers could fund aggressive public awareness campaigns demonstrating simple conservation techniques—fixing leaks, installing low-flow fixtures, and adopting drought-resistant landscaping. Combined, these measures could reduce per capita consumption by 25-30% within five years, fundamentally altering the relationship between Kuwaitis and their most precious resource.

In conclusion, Kuwait's water security is deceptively fragile. By diversifying desalination methods, maximizing wastewater reuse, and implementing effective demand management, the nation can ensure long-term water resilience, reduce its environmental footprint, and establish itself as a regional leader in sustainable arid-climate water management.`,
        keyPoints: [
          "Current desalination system's energy intensity",
          "Wastewater reuse inefficiencies",
          "Lack of demand management",
          "RO technology advantages",
          "Circular water economy benefits"
        ],
        tips: [
          "Provide specific technical details and statistics",
          "Present concrete, implementable solutions",
          "Balance criticism with constructive proposals"
        ]
      },
      {
        id: 9,
        title: "Kuwait's Wetlands Under Threat",
        grade: 12,
        type: "descriptive",
        prompt: "Describe the environmental challenges facing Kuwait's wetlands and explain why their protection is crucial.",
        modelAnswer: `Kuwait's wetlands, such as the coastal marshes and mudflats found along the Bay, are vital, yet highly threatened, ecological systems. They act as critical migratory bird habitats, natural filters for coastal waters, and nurseries for marine life. However, these fragile ecosystems are facing a convergence of severe environmental challenges that threaten their very existence.

The most significant challenge is coastal development and land reclamation. Rapid urban expansion and industrial projects often involve filling in marsh areas, directly destroying the unique habitat. This is exacerbated by marine pollution. Runoff from industrial activities and wastewater discharge introduce heavy metals and harmful chemicals into the shallow wetland waters, poisoning the food chain and rendering the areas toxic for birds and fish.

Furthermore, climate change and sea-level rise present a long-term existential threat. The wetlands exist at the precise intersection of land and sea; even a small rise in water level can permanently submerge the delicate mudflats and eliminate the unique plant life that stabilizes the soil. Coupled with this is the danger of invasive species that thrive in disturbed ecosystems, outcompeting native flora and fauna. Without focused government protection and rigorous enforcement of environmental laws, Kuwait's wetlands are at serious risk of irreversible degradation.`,
        keyPoints: [
          "Critical ecological functions of wetlands",
          "Coastal development impacts",
          "Marine pollution effects",
          "Climate change threats",
          "Need for government protection"
        ],
        tips: [
          "Focus on specific environmental impacts",
          "Connect local issues to global environmental challenges",
          "Emphasize the urgency of conservation"
        ]
      },
      {
        id: 10,
        title: "A Day as an Endangered Houbara Bustard",
        grade: 12,
        type: "narrative",
        prompt: "Write a narrative story from the perspective of an endangered Houbara Bustard, describing its daily struggles and the challenges it faces due to human activity.",
        modelAnswer: `The first sliver of sun painted the flat desert landscape in pale gold, but I was already moving. I am a Houbara Bustard, a bird built for camouflage, my patterned feathers blending perfectly with the arid, scrubby earth. My day began with the urgent need to find food. Every calorie counts.

I moved with a slow, deliberate strut, searching for beetles, scorpions, or the occasional lizard—anything to sustain the energy I would need for the mating display. The greatest relief of the morning was the vast silence, broken only by the crunch of dry stalks under my feet.

But the relief was fleeting. By mid-morning, a distant humming noise began to grow, an engine sound that meant only one thing: humans. I froze, sinking low, my heart drumming a frantic rhythm against my ribs. The vehicle appeared on the horizon, not a hunter this time, but a large, rumbling construction truck. It marked the beginning of another road, another fenced-off development. That patch of Arfaj shrubs where my parents nested last spring? Now just flattened, compacted earth.

I ran, my strong legs eating up the distance, leaving my old territory behind. I found a new, quiet pocket late in the afternoon, but the fear settled deep in my crop. Every day is a desperate trade-off: the need to feed myself against the necessity of avoiding the creatures whose growth means my diminishing world. I settled down for the night, my head cocked, listening to the vast, empty silence, praying it wouldn't be broken by the sound of another engine come morning.`,
        keyPoints: [
          "Endangered species perspective",
          "Habitat destruction impact",
          "Human-wildlife conflict",
          "Survival struggles",
          "Environmental awareness message"
        ],
        tips: [
          "Use first-person narrative voice",
          "Include sensory details and emotional responses",
          "Connect individual story to broader conservation message"
        ]
      }
    ]
  }
];

// Helper functions
export const getWritingTopicsByGrade = (grade: number): WritingTopic[] => {
  const gradeData = writingTopicsData.find(data => data.grade === grade);
  return gradeData ? gradeData.topics : [];
};

export const getAllWritingGrades = (): number[] => {
  return writingTopicsData.map(data => data.grade);
};

export const getTotalTopicsByGrade = (grade: number): number => {
  const topics = getWritingTopicsByGrade(grade);
  return topics.length;
};

export const getTopicsByType = (grade: number, type: string): WritingTopic[] => {
  const topics = getWritingTopicsByGrade(grade);
  return topics.filter(topic => topic.type === type);
};

export const getTopicById = (id: number): WritingTopic | undefined => {
  for (const gradeData of writingTopicsData) {
    const topic = gradeData.topics.find(t => t.id === id);
    if (topic) return topic;
  }
  return undefined;
};