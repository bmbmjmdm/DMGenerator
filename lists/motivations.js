const motivations = [
    "Looking for Artifact",
    "Hiding from Someone",
    "In Search of Knowledge",
    "Looking for Someone",
    "Lost Something",
    "Looking for Friends",
    "Needs Message Delivered",
    "Needs Ingredients/Parts",
    "Needs Money",
    "Protecting Someone/thing",
    "Wants Revenge",
    "Wander lust",
    "Wants Drugs",
    "Worried about Rumors",
    "Seeking Redemption",
    "Running from the Law",
    "Fulfilling a Promise",
    "Curse to Break",
    "Seeking Power",
    "Avoiding Fate",
    "Searching for Belonging",
    "Reuniting with Family",
    "Recovering from Trauma",
    "Mastering a Skill",
    "Betrayed and Seeking Justice",
    "Hoping for a Miracle",
    "Escaping from the Past",
    "Craving Attention",
    "Winning a Challenge",
    "Building a Legacy",
    "Proving Worth",
    "Seeking Forgiveness",
    "Avoiding Conflict",
    "Finding a Cure",
    "Overcoming Fear",
    "Surviving the Wilderness",
    "Protecting a Secret",
    "Running a Business",
    "Starting a Revolution",
    "Mastering an Art",
    "Creating a Masterpiece",
    "Surviving Betrayal",
    "Seeking Adventure",
    "Winning Love",
    "Finding the Truth",
    "Breaking Free",
    "Defying Expectations",
    "Revenge for a Fallen Comrade",
    "Finding Inner Peace",
    "Building Trust",
    "Recovering Lost Glory",
    "Clearing Their Name",
    "Leading a Group",
    "Defeating a Nemesis",
    "Achieving Immortality",
    "Seeking Salvation",
    "Exploring Uncharted Territory",
    "Breaking a Curse",
    "Preventing a Disaster",
    "Getting Even",
    "Searching for a Lost Civilization",
    "Understanding Fate",
    "Preventing a War",
    "Discovering a New World",
    "Seeking the Ultimate Power",
    "Finding a Family",
    "Righting a Wrong",
    "Escaping a Trap",
    "Becoming Famous",
    "Proving a Theory",
    "Mastering Control",
    "Building an Empire",
    "Fulfilling a Vision",
    "Conquering a Fear",
    "Discovering One’s Purpose",
    "Winning Back Honor",
    "Finding an Heir",
    "Becoming Immortal",
    "Healing a Broken Heart",
    "Finding Redemption for Others",
    "Witnessing the Future",
    "Protecting the Environment",
    "Overcoming a Weakness",
    "Reclaiming a Throne",
    "Uniting Factions",
    "Surviving a Nightmare",
    "Discovering a Lost Art",
    "Learning a Forbidden Skill",
    "Breaking Free from Control",
    "Ending a Tyranny",
    "Uncovering a Conspiracy",
    "Keeping a Promise",
    "Unlocking a Mystery",
    "Unlocking One’s Potential",
    "Rising Above the Past",
    "Getting Revenge for a Loved One",
    "Discovering Family Secrets",
    "Fulfilling a Prophecy",
    "Preventing a Betrayal",
    "Building a Future",
    "Freeing the Oppressed",
    "Protecting a Legacy",
    "Winning a Contest",
    "Defying a God",
    "Avoiding Death",
    "Confronting a Fear",
    "Seeking Lost Knowledge",
    "Becoming a Hero",
    "Rescuing a Loved One",
    "Gaining a Powerful Ally",
    "Learning a Hidden Truth",
    "Conquering an Enemy",
    "Discovering One’s Identity",
    "Escaping the Underworld",
    "Finding Lost Memories",
    "Restoring a Broken Kingdom",
    "Rebuilding a Reputation",
    "Finding a Lost Friend",
    "Discovering the Meaning of Life",
    "Restoring a Balance",
    "Revealing a Hidden Power",
    "Finding a Safe Haven",
    "Becoming the Ultimate Warrior",
    "Saving the Innocent",
    "Reshaping History",
    "Avoiding a Prophecy",
    "Solving an Ancient Puzzle",
    "Mastering the Elements",
    "Reaching the Unknown",
    "Reuniting with a Lost Love",
    "Seeking Enlightenment",
    "Discovering a New Religion",
    "Winning the Trust of an Enemy",
    "Becoming a Legend",
    "Seeking the Truth Behind a Myth",
    "Becoming Unstoppable",
    "Saving a Sacred Artifact",
    "Fulfilling a Life’s Work",
    "Finding Hidden Treasure",
    "Defeating an Invincible Foe",
    "Breaking Free from the Past",
    "Preventing a Catastrophe",
    "Becoming the Strongest",
    "Revenge for a Fallen Leader",
    "Discovering the Unknown",
    "Breaking a Bloodline Curse",
    "Finding a Hidden Kingdom",
    "Securing a Peace Treaty",
    "Pursuing the Perfect Dream",
    "Unlocking Forbidden Knowledge",
    "Winning a War",
    "Discovering a Lost Realm",
    "Confronting the Darkness",
    "Finding Unseen Potential",
    "Fighting for Freedom",
    "Clearing the Family Name",
    "Escaping from Captivity",
    "Starting a New Life",
    "Finding a Lost Friend",
    "Redeeming a Fallen Hero",
    "Seeking Lasting Peace",
    "Solving a Mystery",
    "Gathering Allies",
    "Breaking an Oath",
    "Finding Strength in Adversity",
    "Surviving the Apocalypse",
    "Getting to the Truth",
    "Discovering New Lands",
    "Chasing the Unknown",
    "Confronting Inner Demons",
    "Protecting a Child",
    "Protecting a Magical Artifact",
    "Proving a False Accusation",
    "Fulfilling a Dying Wish",
    "Cracking an Ancient Code",
    "Seeking Protection",
    "Unveiling a Secret Society",
    "Uncovering Hidden Power",
    "Becoming the Ultimate Survivor",
    "Learning to Forgive",
    "Revenge for a Fallen Friend",
    "Surpassing a Rival",
    "Avoiding an Ancient Curse",
    "Unlocking a Family Secret",
    "Breaking Free from a Cult",
    "Seeking the Fountain of Youth",
    "Restoring Lost Faith",
    "Building a Stronghold",
    "Defending the Innocent",
    "Exploring a Haunted Place",
    "Fighting for Survival",
    "Discovering Hidden Truths",
    "Finding the Key to the Future",
    "Defeating a Dark Force",
    "Rebuilding After Destruction",
    "Searching for a Cure",
    "Claiming the Throne",
    "Winning Over an Enemy",
    "Finding a Sense of Belonging",
    "Creating a New Identity",
    "Rewriting History",
    "Retrieving a Stolen Item",
    "Completing a Sacred Task",
    "Harnessing a New Power",
    "Discovering a Hidden Talent",
    "Becoming a Protector",
    "Making a Great Sacrifice",
    "Avoiding a Prophetic End",
    "Conquering an Impossible Task",
    "Discovering True Love",
    "Pursuing a Lost Dream",
    "Rebuilding Trust",
    "Defying Natural Laws",
    "Saving a Sacred Land",
    "Finding Lost Hope",
    "Being Reborn",
    "Finding Balance in Life",
    "Mastering a Forbidden Craft",
    "Making History",
    "Revealing the Truth",
    "Confronting an Immortal Foe",
    "Seeking Closure",
    "Breaking Free from Manipulation",
    "Establishing a Legacy",
    "Defending a Sacred Duty",
    "Pursuing Power Beyond Measure",
    "Leading a New Generation",
    "Seeking Personal Enlightenment",
    "Regaining Control",
    "Restoring a Damaged Reputation",
    "Fighting for a New World",
    "Seizing the Ultimate Opportunity",
    "Bringing About a Revolution",
    "Protecting a Newborn",
    "Making a World-Changing Invention",
    "Confronting the Future",
    "Unraveling a Family Mystery",
    "Seeking a Path to Immortality",
    "Creating a Masterpiece",
    "Seeking the Unreachable",
    "Saving a Loved One from a Curse",
    "Breaking a Cycle",
    "Defeating a Demon",
    "Rewriting Fate",
    "Seeking Eternal Knowledge",
    "Resurrecting a Fallen Star",
    "Fulfilling a Divine Mission",
    "Discovering the Origins of Magic",
    "Unlocking an Ancient Power",
    "Fulfilling an Ancient Prophecy",
    "Chasing After Glory",
    "Learning a Forbidden Technique",
    "Building a Dynasty",
    "Restoring Lost Faith",
    "Seeking True Justice",
    "Surviving a Betrayal",
    "Exploring a Hidden Realm",
    "Becoming a Warrior Sage",
    "Uncovering the Truth Behind a Lie",
    "Searching for a Missing Link",
    "Revenge for the Family",
    "Finding the Strength to Heal",
    "Trying to Prevent a Cataclysm",
    "Chasing After a Lost Dream",
    "Proving They Are Not Weak",
    "Seeking to Create Peace",
    "Escaping a Fatal Fate",
    "Conquering the Unknowable",
    "Revealing the Hidden Depths",
    "Mastering the Impossible",
    "Transforming Into a Legend",
    "Breaking the Chains of Destiny",
    "Clearing a Name from History",
    "Fighting Against Fate",
    "Stopping a Dangerous Cult",
    "Seeking the Ultimate Weapon",
    "Taking Revenge on a Betrayer",
    "Building a Revolution",
    "Running from a Past Life",
    "Learning the Unknown Truth",
    "Finding the Lost Key",
    "Restoring a Broken Heart",
    "Breaking a Dangerous Habit",
    "Mastering a Dark Art",
    "Severing Ties with the Past",
    "Fighting for Equality",
    "Chasing After a Mirage",
    "Fulfilling a Vow",
    "Saving the World from Collapse",
    "Confronting a Hidden Threat",
    "Finding a Place to Belong",
    "Revealing a Hidden Power",
    "Bringing Order to Chaos"
]
