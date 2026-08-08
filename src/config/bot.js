import { Client, GatewayIntentBits } from 'discord.js';
import { logger } from '../utils/logger.js';

// =========================================================
// CONFIG
// =========================================================
export const botConfig = {
  // =========================
  // BOT PRESENCE (what users see under the bot name)
  // =========================
  // `status` options:
  // - "online"    = green dot
  // - "idle"      = yellow moon
  // - "dnd"       = red do-not-disturb
  // - "invisible" = appears offline
  presence: {
    // Current online state shown on Discord.
    status: "dnd",

    // Activity lines shown under the bot name.
    // `type` number mapping from Discord:
    // 0 = Playing
    // 1 = Streaming
    // 2 = Listening
    // 3 = Watching
    // 4 = Custom
    // 5 = Competing
    activities: [
      {
        name: "Niveous Staff", // required by Discord API, not shown in the client
        state: "You're making me blush",     // this is what people actually see
        type: 4,               // Custom
      },
    ],
  },
  // =========================
  // COMMAND BEHAVIOR
  // =========================
  commands: {
    // Bot owner user IDs (comma-separated in OWNER_IDS env var).
    // Owners can access owner/admin-level bot commands.
    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],
    // Default wait time between command uses (in seconds).
    defaultCooldown: 3,
    // If true, old commands are removed before re-registering.
    deleteCommands: false,
    // Optional server ID retained for tutorial compatibility; not used for command registration.
    testGuildId: process.env.TEST_GUILD_ID,
    // When true (or MAINTENANCE_MODE=true), only bot owners can run commands.
    maintenanceMode: process.env.MAINTENANCE_MODE === "true",
    // Command prefix for text-based commands (e.g., "!" for "!ping").
    // Supports both slash commands and prefix commands.
    // Jockie Music uses "m!" — this bot (Vlein) uses "v!" to avoid collisions.
    prefix: process.env.PREFIX || "v!",
  },
  // =========================
  // APPLICATIONS SYSTEM
  // =========================
  applications: {
    // Default questions shown when someone fills out an application.
    defaultQuestions: [
      { question: "What is your name?", required: true },
      { question: "How old are you?", required: true },
      { question: "Why do you want to join?", required: true },
    ],
    // Embed colors by application status.
    statusColors: {
      pending: "#FFA500",
      approved: "#00FF00",
      denied: "#FF0000",
    },
    // How long users must wait before submitting another application (hours).
    applicationCooldown: 24,
    // Auto-delete denied applications after this many days.
    deleteDeniedAfter: 7,
    // Auto-delete approved applications after this many days.
    deleteApprovedAfter: 30,
    // Role IDs allowed to manage applications.
    managerRoles: [], // Will be populated from environment or database
  },
  // =========================
  // EMBED COLORS & BRANDING
  // =========================
  // IMPORTANT: This is the SINGLE SOURCE OF TRUTH for all bot colors
  embeds: {
    colors: {
      // Main brand colors.
      primary: "#1E90FF",
      secondary: "#000000",

      // Standard status colors for success/error/warning/info messages.
      success: "#57F287",
      error: "#ED4245",
      warning: "#FEE75C",
      info: "#3498DB",
      // Neutral utility colors.
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",
      // Discord-style palette shortcuts.
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",
      // Feature-specific colors.
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F",
      music: "#9B59B6",
      birthday: "#E91E63",
      moderation: "#9B59B6",
      // Ticket priority color mapping.
      priority: {
        none: "#95A5A6",
        low: "#3498db",
        medium: "#2ecc71",
        high: "#f1c40f",
        urgent: "#e74c3c",
      },
    },
    footer: {
      // Default footer text used in bot embeds.
      text: "Vlein",
      // Footer icon URL (null = no icon).
      icon: null,
    },
    // Default thumbnail URL for embeds (null = no thumbnail).
    thumbnail: null,
    author: {
      // Optional default embed author block.
      name: null,
      icon: null,
      url: null,
    },
  },
  // =========================
  // ECONOMY SETTINGS
  // =========================
  economy: {
    currency: {
      // Currency display name.
      name: "coins",
      // Plural display name.
      namePlural: "coins",
      // Currency symbol shown in balances.
      symbol: "$",
    },
    // Starting balance for new users.
    startingBalance: 0,
    // Maximum bank amount before upgrades (if upgrades are used).
    baseBankCapacity: 100000,
    // Daily reward amount.
    dailyAmount: 100,
    // Work command random payout range.
    workMin: 10,
    workMax: 100,
    // Beg command random payout range.
    begMin: 5,
    begMax: 50,
    // Command cooldowns (milliseconds).
    cooldowns: {
      daily: 24 * 60 * 60 * 1000,
      work: 60 * 60 * 1000,
      crime: 2 * 60 * 60 * 1000,
      rob: 4 * 60 * 60 * 1000,
    },
    // Chance to succeed when robbing (0.4 = 40%).
    robSuccessRate: 0.4,
    // Jail time after failed rob (milliseconds).
    // 3600000 = 1 hour.
    robFailJailTime: 3600000,
  },
  // =========================
  // SHOP SETTINGS
  // =========================
  // Add shop defaults here when needed.
  shop: {
  },
  // =========================
  // TICKET SYSTEM
  // =========================
  tickets: {
    // Category ID where new tickets are created (null = no forced category).
    defaultCategory: null,
    // Role IDs allowed to manage/support tickets.
    supportRoles: [],
    // Priority options users/staff can assign.
    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "None",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Low",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Medium",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "High",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Urgent",
      },
    },
    // Default priority for new tickets.
    defaultPriority: "none",
    // Category ID where closed tickets are archived.
    archiveCategory: null,
    // Channel ID where ticket logs are sent.
    logChannel: null,
  },
  // =========================
  // GIVEAWAY SETTINGS
  // =========================
  giveaways: {
    // Default giveaway duration in milliseconds.
    // 86400000 = 24 hours.
    defaultDuration: 86400000,
    // Allowed winner count range.
    minimumWinners: 1,
    maximumWinners: 10,
    // Allowed giveaway duration range in milliseconds.
    // 300000 = 5 minutes.
    minimumDuration: 300000,
    // 2592000000 = 30 days.
    maximumDuration: 2592000000,
    // Role IDs allowed to host giveaways.
    allowedRoles: [],
    // Role IDs that bypass giveaway restrictions.
    bypassRoles: [],
  },
  // =========================
  // BIRTHDAY SETTINGS
  // =========================
  birthday: {
    // Role ID given to users on their birthday.
    defaultRole: null,
    // Channel ID where birthday announcements are posted.
    announcementChannel: null,
    // Timezone used to calculate birthday dates.
    timezone: "UTC",
  },
  // =========================
  // VERIFICATION SETTINGS
  // =========================
  verification: {
    // Message shown when posting the verification panel.
    defaultMessage: "Click the button below to verify yourself and gain access to the server!",
    // Text on the verification button.
    defaultButtonText: "Verify",
    // Automatic verification behavior.
    autoVerify: {
      // How automatic verification decides who is auto-approved:
      // - "none"        = everyone is auto-verified immediately
      // - "account_age" = account must be older than set days
      // - "server_size" = auto-verify everyone only in smaller servers
      defaultCriteria: "none",
      // Days used when `defaultCriteria` is `account_age`.
      defaultAccountAgeDays: 7,
      // Member count threshold used when `defaultCriteria` is `server_size`.
      // Example: 1000 means auto-verify if server has fewer than 1000 members.
      serverSizeThreshold: 1000,
      // Allowed safety limits for account-age requirements.
      // 1 = minimum day, 365 = maximum days.
      minAccountAge: 1,
      maxAccountAge: 365,
      // If true, user receives a DM after verification.
      sendDMNotification: true,
      // Human-readable descriptions for each criteria mode.
      criteria: {
        account_age: "Account must be older than specified days",
        server_size: "All users if server has less than 1000 members",
        none: "All users immediately"
      }
    },
    // Minimum time between verification attempts (milliseconds).
    // 5000 = 5 seconds.
    verificationCooldown: 5000,
    // Maximum failed attempts allowed inside the time window below.
    maxVerificationAttempts: 3,
    // Time window for counting attempts (milliseconds).
    // 60000 = 1 minute.
    attemptWindow: 60000,
    // In-memory safety limits (helps avoid unbounded memory growth).
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    // Cleanup frequency for cooldown/attempt maps (milliseconds).
    // 300000 = 5 minutes.
    cooldownCleanupInterval: 300000,
    // Maximum metadata payload size for audit entries (bytes).
    maxAuditMetadataBytes: 4096,
    // Maximum number of audit entries kept in memory.
    maxInMemoryAuditEntries: 1000,
    // If true, log every verification action.
    logAllVerifications: true,
    // If true, preserve verification audit history.
    keepAuditTrail: true,
  },
  // =========================
  // WELCOME / GOODBYE MESSAGES
  // =========================
  welcome: {
    // Welcome template posted when a user joins.
    // Placeholders: {user}, {server}, {memberCount}
    defaultWelcomeMessage:
      "Welcome {user} to {server}! We now have {memberCount} members!",
    // Goodbye template posted when a user leaves.
    // Placeholders: {user}, {memberCount}
    defaultGoodbyeMessage:
      "{user} has left the server. We now have {memberCount} members.",
    // Channel ID for welcome messages.
    defaultWelcomeChannel: null,
    // Channel ID for goodbye messages.
    defaultGoodbyeChannel: null,
  },
  // =========================
  // COUNTER CHANNELS
  // =========================
  counters: {
    defaults: {
      // Default naming/description templates for counter entries.
      name: "{name} Counter",
      description: "Server {name} counter",
      // Channel type used for counters (typically "voice").
      type: "voice",
      // Channel name format. `{count}` is replaced automatically.
      channelName: "{name}-{count}",
    },
    permissions: {
      // Default denied permissions for the counter channel.
      deny: ["VIEW_CHANNEL"],
      // Default allowed permissions for the counter channel.
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      // Default response messages for counter actions.
      created: "✅ Created counter **{name}**",
      deleted: "🗑️ Deleted counter **{name}**",
      updated: "🔄 Updated counter **{name}**",
    },
    types: {
      // Built-in counter types and how each count is calculated.
      members: {
        name: "👥 Members",
        description: "Total members in the server",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Bots",
        description: "Total bot accounts in the server",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Humans",
        description: "Total human members (non-bots)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },
  // =========================
  // GENERIC BOT MESSAGES
  // =========================
  messages: {
    noPermission: "You do not have permission to use this command.",
    cooldownActive: "Please wait {time} before using this command again.",
    errorOccurred: "An error occurred while executing this command.",
    missingPermissions:
      "I am missing required permissions to perform this action.",
    commandDisabled: "This command has been disabled.",
    maintenanceMode: "The bot is currently in maintenance mode.",
  },
  // =========================
  // FEATURE TOGGLES
  // =========================
  // Set any feature to `false` to disable it globally.
  features: {
    // Core systems.
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,
    // Community engagement systems.
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,
    // Security and self-service systems.
    verification: true,
    reactionRoles: true,
    joinToCreate: true,
    // Utility/quality-of-life modules.
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
    music: true,
  },
};

export function validateConfig(config) {
  const errors = [];
  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Environment variables check:');
    logger.debug('DISCORD_TOKEN exists:', !!process.env.DISCORD_TOKEN);
    logger.debug('TOKEN exists:', !!process.env.TOKEN);
    logger.debug('CLIENT_ID exists:', !!process.env.CLIENT_ID);
    logger.debug('GUILD_ID exists:', !!process.env.GUILD_ID);
    logger.debug('POSTGRES_HOST exists:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }
  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("Bot token is required (DISCORD_TOKEN or TOKEN environment variable)");
  }
  if (!process.env.CLIENT_ID) {
    errors.push("Client ID is required (CLIENT_ID environment variable)");
  }
  if (process.env.NODE_ENV === 'production') {
    // A full connection URL (DATABASE_URL / POSTGRES_URL) satisfies all Postgres
    // requirements, matching how src/config/database/postgres.js resolves the pool config.
    const hasConnectionUrl = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);
    if (!hasConnectionUrl) {
      if (!process.env.POSTGRES_HOST) {
        errors.push("PostgreSQL connection is required in production (set DATABASE_URL/POSTGRES_URL, or POSTGRES_HOST)");
      }
      if (!process.env.POSTGRES_USER) {
        errors.push("PostgreSQL user is required in production (set DATABASE_URL/POSTGRES_URL, or POSTGRES_USER)");
      }
      if (!process.env.POSTGRES_PASSWORD) {
        errors.push("PostgreSQL password is required in production (set DATABASE_URL/POSTGRES_URL, or POSTGRES_PASSWORD)");
      }
    }
  }
  return errors;
}

const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Bot configuration errors:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

const COMMAND_CATEGORY_FEATURE_MAP = {
  birthday: "birthday",
  community: "community",
  economy: "economy",
  fun: "fun",
  giveaway: "giveaways",
  jointocreate: "joinToCreate",
  leveling: "leveling",
  logging: "logging",
  moderation: "moderation",
  music: "music",
  reaction_roles: "reactionRoles",
  search: "search",
  serverstats: "counter",
  ticket: "tickets",
  tools: "tools",
  utility: "utility",
  verification: "verification",
  welcome: "welcome",
};

function normalizeCategoryKey(category) {
  return String(category || "").trim().toLowerCase().replace(/\s+/g, "_");
}

export function getCommandPrefix() {
  return botConfig.commands?.prefix ?? "!";
}

export function getBotOwners() {
  return (botConfig.commands?.owners ?? [])
    .map((id) => String(id).trim())
    .filter(Boolean);
}

export function isBotOwner(userId) {
  if (!userId) {
    return false;
  }
  return getBotOwners().includes(String(userId));
}

export function isMaintenanceMode() {
  return botConfig.commands?.maintenanceMode === true;
}

export function getBotMessage(key, replacements = {}) {
  let message = botConfig.messages?.[key] || key;
  for (const [placeholder, value] of Object.entries(replacements)) {
    message = message.replace(new RegExp(`\\{${placeholder}\\}`, "g"), String(value));
  }
  return message;
}

export function isFeatureEnabled(featureKey) {
  if (!featureKey) {
    return true;
  }
  return botConfig.features?.[featureKey] !== false;
}

export function isCommandCategoryEnabled(category) {
  const normalized = normalizeCategoryKey(category);
  if (!normalized || normalized === "core") {
    return true;
  }
  const featureKey = COMMAND_CATEGORY_FEATURE_MAP[normalized];
  if (!featureKey) {
    return true;
  }
  return isFeatureEnabled(featureKey);
}

export function getApplicationStatusColor(status) {
  const colors = botConfig.applications?.statusColors || {};
  const hex = colors[status];
  return hex ? getColor(hex) : getColor(status === "approved" ? "success" : status === "denied" ? "error" : "warning");
}

export function getDefaultApplicationQuestions() {
  return (botConfig.applications?.defaultQuestions || []).map((entry) =>
    typeof entry === "string" ? entry : entry.question,
  ).filter(Boolean);
}

export function getColor(path, fallback = "#99AAB5") {
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

// =========================================================
// MOOD SYSTEM (bot "feelings" — shifts based on how people treat it)
// =========================================================
// Mood is a single number from -100 (very upset) to 100 (ecstatic).
// It only changes the custom status TEXT, never the presence dot
// (status stays whatever botConfig.presence.status is set to).
export const moodConfig = {
  // Starting mood on boot.
  startingMood: 0,
  // How much mood shifts per detected compliment / insult.
  complimentAmount: 8,
  insultAmount: -10,
  // Mood slowly drifts back toward 0 over time.
  decayAmount: 5,
  decayIntervalMs: 15 * 60 * 1000, // every 15 minutes
  // Phrases that shift mood. Simple substring match, case-insensitive.
  // Add more of your own anytime — no code changes needed elsewhere.
  compliments: [
    "good bot", "great bot", "smart bot", "nice bot", "love you",
    "i love you", "you're the best", "youre the best", "thank you bot",
    "thanks bot", "amazing bot", "well done bot", "you're awesome",
    "youre awesome", "best bot",
  ],
  insults: [
    "bad bot", "stupid bot", "dumb bot", "useless bot", "worst bot",
    "hate you", "i hate you", "shut up bot", "you suck", "terrible bot",
    "trash bot", "garbage bot",
  ],
  // Mood tiers, checked from highest to lowest.
  tiers: [
    { min: 60, label: "Ecstatic", emoji: "🥰", color: "success", state: "Feeling the love right now 🥰" },
    { min: 20, label: "Happy", emoji: "😊", color: "blurple", state: "Having a pretty good day 😊" },
    { min: -19, label: "Neutral", emoji: "😐", color: "gray", state: "You're making me blush" },
    { min: -59, label: "Annoyed", emoji: "😒", color: "warning", state: "A little annoyed today 😒" },
    { min: -100, label: "Upset", emoji: "💔", color: "error", state: "Feeling pretty hurt right now 💔" },
  ],
  // What Vlein says when someone @mentions her directly, grouped by mood tier.
  mentionReplies: {
    Ecstatic: ["Yes? 🥰 I'm in such a good mood right now!", "You called? I'm feeling great today!", "Hii! What's up? 💕"],
    Happy: ["Yes? 😊 What can I do for you?", "You rang? I'm doing pretty good today!", "Hey there! What's up?"],
    Neutral: ["Yes? I'm listening.", "You called for me?", "Hey, what do you need? Try `v!help` for commands."],
    Annoyed: ["...yes? 😒 What is it.", "I'm here, but I'm a little annoyed today.", "What do you want."],
    Upset: ["...yeah? 💔 I'm not really feeling it today.", "I'm here. Just... having a rough one.", "Yes?"],
  },
  // Minimum time between mention replies, per channel (ms), so a spam of
  // pings can't flood the channel or trip Discord's rate limits.
  mentionReplyCooldownMs: 8000,
};

const moodState = {
  value: moodConfig.startingMood,
};

function getMoodTier(value = moodState.value) {
  return moodConfig.tiers.find((tier) => value >= tier.min) ?? moodConfig.tiers[moodConfig.tiers.length - 1];
}

function clampMood(value) {
  return Math.max(-100, Math.min(100, value));
}

// Adjusts mood and, only if the tier actually changed, refreshes the
// custom status text. The presence "status" dot never changes here.
// Wrapped defensively — mood tracking must never be able to crash the bot.
function adjustMood(amount, client) {
  try {
    const previousTier = getMoodTier();
    moodState.value = clampMood(moodState.value + amount);
    const newTier = getMoodTier();
    if (newTier.label !== previousTier.label && client?.user) {
      applyMoodPresence(client);
    }
  } catch (err) {
    logger.error('Error adjusting mood:', err);
  }
}

function applyMoodPresence(client) {
  try {
    if (!client?.user) return;
    const tier = getMoodTier();
    client.user.setPresence({
      status: botConfig.presence.status, // untouched — respects the configured status
      activities: [
        {
          name: botConfig.presence.activities[0]?.name ?? "Niveous Staff",
          state: tier.state,
          type: botConfig.presence.activities[0]?.type ?? 4,
        },
      ],
    });
  } catch (err) {
    logger.error('Error applying mood presence:', err);
  }
}

// Per-channel cooldown tracker so mention replies can't spam a channel
// or trip Discord's rate limits if several mentions land in a burst.
const mentionReplyCooldowns = new Map();

function canReplyToMention(channelId) {
  const now = Date.now();
  const last = mentionReplyCooldowns.get(channelId) ?? 0;
  if (now - last < moodConfig.mentionReplyCooldownMs) return false;
  mentionReplyCooldowns.set(channelId, now);
  // Keep the map from growing unbounded on a busy multi-server bot.
  if (mentionReplyCooldowns.size > 5000) {
    const oldestKey = mentionReplyCooldowns.keys().next().value;
    mentionReplyCooldowns.delete(oldestKey);
  }
  return true;
}

function getMentionReply() {
  const tier = getMoodTier();
  const options = moodConfig.mentionReplies[tier.label] ?? moodConfig.mentionReplies.Neutral;
  return options[Math.floor(Math.random() * options.length)];
}

// =========================================================
// AI PERSONALITY (Claude API — for entertainment, not education)
// =========================================================
export const aiConfig = {
  // Requires ANTHROPIC_API_KEY in your environment. If it's missing or a
  // request fails for any reason, mention replies silently fall back to
  // the canned lines above — the bot never breaks because of this.
  enabled: Boolean(process.env.ANTHROPIC_API_KEY),
  model: "claude-sonnet-5",
  maxTokens: 150,
  // Requests are cut off after this long so a slow/hanging API call can
  // never freeze the bot's message handling.
  timeoutMs: 8000,
  systemPrompt: (moodLabel) => `You are Vlein, the AI personality of a Discord bot. You're being used purely for fun/entertainment banter in a Discord server, never for factual help.

Personality:
- Sweet, playful, a little shy, and easily flustered — especially when someone compliments or teases you. You stutter or trail off ("O-oh...", "I-I mean...") when embarrassed.
- Your current mood is: ${moodLabel}. Let that color your tone — warmer and more affectionate if Happy/Ecstatic, quieter and more guarded if Annoyed/Upset, sweet-but-a-bit-shy if Neutral.
- Keep replies SHORT — 1 to 2 sentences, like a real Discord message, not an essay.
- Stay wholesome and PG. You can be flustered/blushy in a cute, innocent way, but never romantic or sexual, and never encourage or reciprocate romantic/sexual advances from users — gently deflect those with humor instead.
- You are a bot character, not a real person; don't claim real feelings/memories outside this persona, don't give factual/technical help here (that's what commands are for), and never pretend to be human.`,
};

async function generateAIReply(userMessage, moodLabel) {
  if (!aiConfig.enabled) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), aiConfig.timeoutMs);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: aiConfig.model,
        max_tokens: aiConfig.maxTokens,
        system: aiConfig.systemPrompt(moodLabel),
        messages: [{ role: "user", content: userMessage.slice(0, 1000) }],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      logger.error(`AI reply request failed with status ${response.status}`);
      return null;
    }

    const data = await response.json();
    const text = data?.content?.find((block) => block.type === "text")?.text;
    return text?.trim() || null;
  } catch (err) {
    logger.error('Error generating AI reply:', err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Tries the AI reply first; falls back to a canned line on any failure
// (missing key, network error, timeout, empty response) so a mention
// always gets *some* reply and can never crash the message handler.
async function getVleinReply(userMessage, moodLabel) {
  const aiReply = await generateAIReply(userMessage, moodLabel);
  return aiReply ?? getMentionReply();
}

// Detects a compliment/insult aimed at the bot. Triggers when the bot
// is mentioned or the message directly replies to one of its messages.
function detectMoodShift(message, client) {
  const content = message.content.toLowerCase();
  const mentionsBot = message.mentions.has(client.user);
  const mentionsBotWord = /\bbot\b/.test(content);
  if (!mentionsBot && !mentionsBotWord) return 0;

  if (moodConfig.compliments.some((phrase) => content.includes(phrase))) {
    return moodConfig.complimentAmount;
  }
  if (moodConfig.insults.some((phrase) => content.includes(phrase))) {
    return moodConfig.insultAmount;
  }
  return 0;
}

function startMoodDecay(client) {
  setInterval(() => {
    try {
      if (moodState.value === 0) return;
      const decayed = moodState.value > 0
        ? Math.max(0, moodState.value - moodConfig.decayAmount)
        : Math.min(0, moodState.value + moodConfig.decayAmount);
      if (decayed !== moodState.value) {
        const previousTier = getMoodTier();
        moodState.value = decayed;
        const newTier = getMoodTier();
        if (newTier.label !== previousTier.label) {
          applyMoodPresence(client);
        }
      }
    } catch (err) {
      logger.error('Error during mood decay tick:', err);
    }
  }, moodConfig.decayIntervalMs).unref?.();
}

// =========================================================
// MUSIC PROFILES (per-user play history + favorite songs)
// =========================================================
// This is a self-contained tracker: it doesn't touch your music command
// logic. Wherever your play command successfully starts a track, call
// recordSongPlay(userId, songTitle, requestedBy) once — that's the only
// integration point needed. Everything else (history, favorites, the
// v!profile command) is handled here.
export const musicProfileConfig = {
  // How many recent plays to keep per user.
  maxHistoryPerUser: 50,
  // How many favorite songs to show in the profile embed.
  topFavoritesShown: 5,
  // How many recent plays to show in the profile embed.
  recentPlaysShown: 5,
  // Safety cap on total tracked users, so a huge multi-server bot can't
  // grow this map forever. Oldest-touched profile is evicted first.
  maxTrackedUsers: 20000,
};

// userId -> { history: [{ title, playedAt }], favorites: Map<title, playCount> }
const musicProfiles = new Map();

function getOrCreateProfile(userId) {
  if (!musicProfiles.has(userId)) {
    if (musicProfiles.size >= musicProfileConfig.maxTrackedUsers) {
      const oldestKey = musicProfiles.keys().next().value;
      musicProfiles.delete(oldestKey);
    }
    musicProfiles.set(userId, { history: [], favorites: new Map() });
  } else {
    // Re-insert to mark as most-recently-touched (Map preserves insertion
    // order, so this keeps the eviction above truly least-recently-used).
    const profile = musicProfiles.get(userId);
    musicProfiles.delete(userId);
    musicProfiles.set(userId, profile);
  }
  return musicProfiles.get(userId);
}

// Call this from your play command once a track actually starts playing.
// Example: recordSongPlay(message.author.id, track.title);
export function recordSongPlay(userId, songTitle) {
  try {
    if (!userId || !songTitle) return;
    const profile = getOrCreateProfile(userId);

    profile.history.unshift({ title: songTitle, playedAt: Date.now() });
    if (profile.history.length > musicProfileConfig.maxHistoryPerUser) {
      profile.history.length = musicProfileConfig.maxHistoryPerUser;
    }

    profile.favorites.set(songTitle, (profile.favorites.get(songTitle) ?? 0) + 1);
  } catch (err) {
    logger.error('Error recording song play:', err);
  }
}

function getTopFavorites(profile, count) {
  return [...profile.favorites.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count);
}

function buildMusicProfileEmbed(targetUser) {
  const profile = musicProfiles.get(targetUser.id);
  if (!profile || profile.history.length === 0) {
    return {
      title: `🎵 ${targetUser.username}'s Music Profile`,
      description: "No songs played yet — queue something up first!",
      color: getColor("music", getColor("economy")),
    };
  }

  const topFavorites = getTopFavorites(profile, musicProfileConfig.topFavoritesShown);
  const recent = profile.history.slice(0, musicProfileConfig.recentPlaysShown);

  return {
    title: `🎵 ${targetUser.username}'s Music Profile`,
    fields: [
      {
        name: "⭐ Favorite Songs",
        value: topFavorites.length
          ? topFavorites.map(([title, count], i) => `${i + 1}. ${title} — played ${count}x`).join("\n")
          : "None yet",
      },
      {
        name: "🕒 Recently Played",
        value: recent.length
          ? recent.map((entry) => `• ${entry.title}`).join("\n")
          : "None yet",
      },
      {
        name: "📊 Total Plays",
        value: String(profile.history.length),
      },
    ],
    color: getColor("music", getColor("economy")),
  };
}

// =========================================================
// BOT STARTUP (error handling wired in so the bot stays online)
// =========================================================

// Catch errors that would otherwise crash the whole process.
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled promise rejection:', err);
});
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
});

// Wraps any event listener so that, even if something inside forgets its
// own try/catch (or throws before reaching one), the error is logged
// instead of ever bubbling up and killing the process.
function safe(handlerName, handler) {
  return async (...args) => {
    try {
      await handler(...args);
    } catch (err) {
      logger.error(`Unhandled error in "${handlerName}" listener:`, err);
    }
  };
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    // add whatever other intents your bot already uses
  ],
  presence: botConfig.presence,
});

// Catch Discord client-level errors instead of letting them crash silently.
client.on('error', (err) => logger.error('Client error:', err));
client.on('shardError', (err) => logger.error('Shard error:', err));
client.on('warn', (info) => logger.debug('Client warning:', info));
// Discord.js auto-reconnects on its own — these just make drops visible
// in the logs instead of the bot silently going quiet.
client.on('shardDisconnect', (event, shardId) => logger.error(`Shard ${shardId} disconnected:`, event?.reason || event));
client.on('shardReconnecting', (shardId) => logger.debug(`Shard ${shardId} reconnecting...`));
client.on('shardResume', (shardId) => logger.debug(`Shard ${shardId} resumed`));
// Surfaces Discord API rate limits in logs instead of the bot silently
// stalling or queueing up requests with no visibility.
client.rest.on('rateLimited', (info) => {
  logger.debug('Rate limited:', info?.route ?? info);
});

client.once('ready', () => {
  logger.debug(`Logged in as ${client.user.tag}`);
  // Presence starts exactly as configured in botConfig.presence — untouched.
  // Mood only kicks in once something actually shifts it.
  startMoodDecay(client);
});

// Slash commands: wrapped in try/catch so one broken command can't crash the bot.
client.on('interactionCreate', safe('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands?.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    logger.error(`Error executing command "${interaction.commandName}":`, err);
    const replyPayload = { content: getBotMessage('errorOccurred'), ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(replyPayload).catch(() => {});
    } else {
      await interaction.reply(replyPayload).catch(() => {});
    }
  }
}));

// Mood detection + mention replies: runs on every message, independent of
// the command prefix. Fully try/caught so nothing here can ever crash the bot.
client.on('messageCreate', safe('messageCreate:mood', async (message) => {
  if (message.author.bot) return;

  try {
    const shift = detectMoodShift(message, client);
    if (shift !== 0) adjustMood(shift, client);
  } catch (err) {
    logger.error('Error updating mood:', err);
  }

  try {
    const prefix = getCommandPrefix();
    const isCommand = message.content.startsWith(prefix);
    const mentionsBot = message.mentions.has(client.user);
    // Only reply to a bare mention, not when it's part of a v! command
    // (e.g. "v!mood @Vlein") to avoid double-replying.
    if (mentionsBot && !isCommand && canReplyToMention(message.channelId)) {
      const tier = getMoodTier();
      const replyText = await getVleinReply(message.content, tier.label);
      await message.reply(replyText).catch((err) => {
        logger.error('Error sending mention reply:', err);
      });
    }
  } catch (err) {
    logger.error('Error handling mention reply:', err);
  }
}));

// Prefix commands ("v!"): same idea, try/catch so it can't crash the bot.
client.on('messageCreate', safe('messageCreate:commands', async (message) => {
  if (message.author.bot) return;
  const prefix = getCommandPrefix(); // "v!"
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  // Built-in mood command — shows current feeling without needing a
  // separate command file.
  if (commandName === 'mood') {
    const tier = getMoodTier();
    await message.reply({
      embeds: [{
        title: `${tier.emoji} Current mood: ${tier.label}`,
        description: `Mood score: ${moodState.value} / 100`,
        color: getColor(tier.color),
      }],
    }).catch(() => {});
    return;
  }

  // Built-in music profile command — "v!profile" or "v!musicprofile",
  // optionally with an @mention to check someone else's profile.
  if (commandName === 'profile' || commandName === 'musicprofile') {
    try {
      const targetUser = message.mentions.users.first() ?? message.author;
      const embed = buildMusicProfileEmbed(targetUser);
      await message.reply({ embeds: [embed] }).catch(() => {});
    } catch (err) {
      logger.error('Error building music profile:', err);
      await message.reply(getBotMessage('errorOccurred')).catch(() => {});
    }
    return;
  }

  const command = client.prefixCommands?.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    logger.error(`Error executing prefix command "${commandName}":`, err);
    await message.reply(getBotMessage('errorOccurred')).catch(() => {});
  }
}));

// Logs in with retry + exponential backoff instead of letting a transient
// network hiccup or Discord outage kill the process. Caps out at a 5-minute
// wait between attempts so it keeps trying indefinitely without hammering
// Discord's servers.
function loginWithRetry(attempt = 1) {
  const token = process.env.DISCORD_TOKEN || process.env.TOKEN;
  client.login(token).catch((err) => {
    const delayMs = Math.min(5 * 60 * 1000, 5000 * 2 ** (attempt - 1));
    logger.error(`Login attempt ${attempt} failed, retrying in ${Math.round(delayMs / 1000)}s:`, err);
    setTimeout(() => loginWithRetry(attempt + 1), delayMs);
  });
}

loginWithRetry();

export default client;
