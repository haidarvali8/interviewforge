/* InterviewForge — practice.js
   Core practice tool: role-based question bank, timed practice mode,
   timed mock-interview mode, STAR self-review, self-scoring,
   localStorage progress (stats, streak, daily free-question quota).
   Pure client-side — no backend, no external APIs. */

(function () {
  'use strict';

  /* ================= Question bank =================
     Each role: icon + 6 questions. Every question has:
     q         — the interview question
     tip       — what interviewers are really looking for
     framework — bullet outline for structuring a strong answer */

  var QUESTION_BANK = {
    "Software Engineer": {
      icon: "💻",
      questions: [
        {
          q: "Tell me about a challenging bug you debugged.",
          tip: "Interviewers want to hear a structured debugging process, not just the fix. Walk through how you isolated the problem.",
          framework: [
            "Describe the symptom and its impact on users or the system.",
            "Explain how you reproduced it and narrowed down the cause (logs, debugger, bisecting).",
            "State the root cause and the fix you shipped.",
            "End with what you changed so it won't happen again (test, monitor, docs)."
          ]
        },
        {
          q: "How would you design a REST API for a new feature?",
          tip: "They are testing API design fundamentals: resource modeling, conventions, and trade-offs. Think out loud.",
          framework: [
            "Name the resources and sketch the endpoints (nouns, not verbs).",
            "Cover HTTP methods, status codes, and error response shape.",
            "Mention auth, versioning, and pagination for list endpoints.",
            "Note one trade-off (e.g., REST vs GraphQL) and why you chose REST here."
          ]
        },
        {
          q: "Describe a time you disagreed with a teammate on a technical decision.",
          tip: "This is a collaboration question disguised as a technical one. Show you can disagree respectfully and commit to the outcome.",
          framework: [
            "Set the scene: what the decision was and the two positions.",
            "Explain your reasoning with data or precedent, not ego.",
            "Describe how you reached a resolution (prototype, RFC, lead tiebreak).",
            "Share the result and what you'd do the same or differently."
          ]
        },
        {
          q: "How do you keep code maintainable in a large codebase?",
          tip: "They want concrete habits, not platitudes. Name the practices you actually follow week to week.",
          framework: [
            "Code reviews: what you look for beyond style (naming, edge cases, tests).",
            "Testing strategy: unit vs integration, and what coverage means to you.",
            "Documentation: READMEs, ADRs, or comments where they pay off.",
            "Refactoring: boy-scout rule and when you carve out dedicated cleanup time."
          ]
        },
        {
          q: "How would you scale a web app that suddenly gets 10x traffic?",
          tip: "Start by finding the bottleneck before throwing solutions. Interviewers reward a methodical approach over buzzwords.",
          framework: [
            "Identify likely bottlenecks first: DB, app tier, or static assets.",
            "Caching layers: CDN for static, Redis for hot reads.",
            "Horizontal scaling: stateless app servers behind a load balancer.",
            "Database: read replicas, indexing, then sharding as a last resort; add monitoring."
          ]
        },
        {
          q: "Tell me about a project you're proud of.",
          tip: "Pick ONE project with measurable impact. Pride without results sounds hollow to hiring managers.",
          framework: [
            "The problem: who had it and why it mattered.",
            "Your specific role and the key technical decisions you owned.",
            "The outcome with numbers (latency, revenue, adoption).",
            "What the project taught you."
          ]
        }
      ]
    },
    "Data Analyst": {
      icon: "📊",
      questions: [
        {
          q: "How do you handle messy or incomplete data?",
          tip: "They want to see that you profile data before trusting it, and that you communicate limitations honestly.",
          framework: [
            "Profile first: nulls, duplicates, outliers, schema mismatches.",
            "Document every cleaning decision and assumption.",
            "Choose imputation vs exclusion deliberately — and say why.",
            "Validate results against a known source or sanity check."
          ]
        },
        {
          q: "Explain a dashboard you built and the decisions it drove.",
          tip: "A dashboard is only as good as the action it caused. Lead with the business decision, not the tool.",
          framework: [
            "Who the audience was and what decision they needed to make.",
            "The 2–3 KPIs you chose and why those, not vanity metrics.",
            "One design choice (filters, drill-downs) that made it usable.",
            "The concrete decision or change that resulted."
          ]
        },
        {
          q: "How would you measure the success of a new feature?",
          tip: "They are testing whether you can pick a North Star metric plus guardrails, not just list metrics.",
          framework: [
            "Define the goal in one sentence, then a primary success metric.",
            "Add 1–2 guardrail metrics (e.g., retention, support tickets).",
            "Propose the experiment design: A/B test, sample size, duration.",
            "Say how you'd segment results to check for uneven impact."
          ]
        },
        {
          q: "Tell me about a time your analysis was wrong.",
          tip: "Everyone has been wrong. They want intellectual honesty and a better process afterward.",
          framework: [
            "What you concluded and what the real story turned out to be.",
            "The root cause of the error (bad join, survivorship bias, stale data).",
            "How you caught it and communicated the correction.",
            "The check you added to your workflow because of it."
          ]
        },
        {
          q: "In SQL, how would you find duplicate records in a table?",
          tip: "A quick technical check. Answer cleanly, then mention the edge cases that show depth.",
          framework: [
            "GROUP BY the key columns with HAVING COUNT(*) > 1.",
            "Use ROW_NUMBER() over a partition to flag or delete dupes.",
            "Watch for NULL handling and near-duplicates (trailing spaces, case).",
            "Mention preventing them: unique constraints at write time."
          ]
        },
        {
          q: "How do you explain technical findings to non-technical stakeholders?",
          tip: "Communication is half the analyst job. Show you translate numbers into decisions.",
          framework: [
            "Lead with the recommendation, not the methodology.",
            "Use one clear visual per point; avoid chart junk.",
            "Translate stats into plain language ('this means X more signups').",
            "Put caveats in an appendix, not the headline."
          ]
        }
      ]
    },
    "Marketing Manager": {
      icon: "📣",
      questions: [
        {
          q: "Tell me about a campaign you ran end to end.",
          tip: "Own the full arc: strategy, execution, and numbers. Vague answers suggest you only ran a slice of it.",
          framework: [
            "The goal and target audience in one sentence.",
            "Your strategy: channels chosen and why.",
            "Execution highlights and one obstacle you solved mid-flight.",
            "Results vs target with the metrics that mattered."
          ]
        },
        {
          q: "How do you decide which channels to invest in?",
          tip: "They want a testing mindset plus unit economics, not channel loyalty.",
          framework: [
            "Start from the audience: where they actually spend attention.",
            "Run small tests with clear success thresholds before scaling.",
            "Compare CAC and payback across channels, not just ROAS.",
            "Reallocate quarterly based on marginal returns."
          ]
        },
        {
          q: "Describe a campaign that failed. What did you learn?",
          tip: "Failure stories build credibility — if you show the lesson changed your process.",
          framework: [
            "What you expected vs what happened, with numbers.",
            "Your honest diagnosis of the root cause.",
            "The specific process change you made afterward.",
            "One later win that used that lesson."
          ]
        },
        {
          q: "How do you measure marketing ROI?",
          tip: "Connect spend to revenue, not just engagement. Show you speak the CFO's language.",
          framework: [
            "Define ROI as incremental revenue over fully-loaded cost.",
            "Attribution approach: what model you use and its limits.",
            "Separate brand/long-term effects from direct response.",
            "Report cadence and the one number leadership watches."
          ]
        },
        {
          q: "How do you work with sales teams?",
          tip: "Marketing-sales friction is universal. Show you build shared definitions and feedback loops.",
          framework: [
            "Agree on lead definitions and SLAs up front (MQL/SQL).",
            "Share a feedback loop: which leads actually close.",
            "Joint rituals: pipeline reviews or shared dashboards.",
            "One example of a change you made from sales feedback."
          ]
        },
        {
          q: "What would your 30-60-90 day plan look like here?",
          tip: "Balance learning with early wins. Research the company first so the plan is specific.",
          framework: [
            "Days 1–30: learn — audits, stakeholder interviews, data baselines.",
            "Days 31–60: quick wins — fix the obvious leaks, ship one test.",
            "Days 61–90: strategy — present a plan tied to revenue goals.",
            "How you'd measure progress at each stage."
          ]
        }
      ]
    },
    "Sales Representative": {
      icon: "🤝",
      questions: [
        {
          q: "Walk me through your sales process.",
          tip: "They want a repeatable process, not heroics. Show stages, qualification, and follow-through.",
          framework: [
            "Prospecting: how you build and prioritize your list.",
            "Discovery: the 3–4 questions you always ask.",
            "Qualification: your framework (BANT, MEDDIC, or your own).",
            "Close and follow-up: trial closes, handling stalls, post-sale handoff."
          ]
        },
        {
          q: "Tell me about a deal you lost.",
          tip: "Losses are normal; hiding them is the red flag. Show you debrief every loss.",
          framework: [
            "The deal: size, stage where it stalled, and who decided.",
            "Your honest read on why you lost (champion, timing, product fit).",
            "What you changed in your process afterward.",
            "A later deal where that lesson paid off."
          ]
        },
        {
          q: "How do you handle objections about price?",
          tip: "Never discount first. They want to see you re-anchor on value before touching price.",
          framework: [
            "Acknowledge and isolate: 'Is price the only concern?'",
            "Re-anchor on ROI and cost of inaction with their numbers.",
            "Offer options: scope or terms adjustments before discounts.",
            "Know your walk-away point and hold it."
          ]
        },
        {
          q: "How do you prospect and build pipeline?",
          tip: "Consistency beats bursts. Show a daily system and how you measure it.",
          framework: [
            "Your ideal customer profile and how you source lists.",
            "Daily/weekly activity targets (calls, emails, social touches).",
            "Personalization approach that actually gets replies.",
            "How you track conversion rates and refine messaging."
          ]
        },
        {
          q: "Describe your biggest win last year.",
          tip: "Make it a story with stakes, not just a number. They want to see how you sell, not just that you did.",
          framework: [
            "The account, the deal size, and why it was hard.",
            "The turning point: what unlocked it (champion, proof, timing).",
            "Your specific moves in the final stretch.",
            "The result and what you replicated from it."
          ]
        },
        {
          q: "How do you prioritize accounts in your territory?",
          tip: "Territory management separates pros from order-takers. Show a tiering system.",
          framework: [
            "Tier accounts by potential and likelihood to buy.",
            "Time allocation: most effort on tier-one, automation for the rest.",
            "Account plans for top targets: contacts, triggers, plays.",
            "Quarterly re-tiering based on results."
          ]
        }
      ]
    },
    "Customer Support": {
      icon: "🎧",
      questions: [
        {
          q: "Tell me about a difficult customer interaction.",
          tip: "Show empathy first, process second. They are listening for de-escalation skills.",
          framework: [
            "The situation and why the customer was upset.",
            "How you acknowledged their feelings before solving.",
            "The steps you took to resolve it.",
            "The outcome and any follow-up you did."
          ]
        },
        {
          q: "How do you handle multiple urgent tickets at once?",
          tip: "Prioritization under pressure is the core skill here. Show a system, not panic.",
          framework: [
            "Triage criteria: impact, urgency, and SLA.",
            "How you communicate wait times to lower-priority customers.",
            "When you escalate vs handle it yourself.",
            "How you reset between tickets to stay sharp."
          ]
        },
        {
          q: "Describe a time you turned an angry customer around.",
          tip: "This is your hero story. Make the turnaround specific and human.",
          framework: [
            "What went wrong and the customer's emotional state.",
            "What you said or did that changed the tone.",
            "The resolution and the customer's reaction.",
            "What you learned about reading people."
          ]
        },
        {
          q: "How do you learn a new product quickly?",
          tip: "Support hires live in the product. Show a learning system, not just 'I'm a fast learner.'",
          framework: [
            "Hands-on: click through everything as a new user would.",
            "Read the docs and help center like a customer.",
            "Shadow experienced agents and take notes on edge cases.",
            "Keep a personal knowledge base of tricky issues."
          ]
        },
        {
          q: "What does great customer service mean to you?",
          tip: "Go beyond 'being nice.' Great answers mention resolution, effort, and prevention.",
          framework: [
            "Solving the real problem, not just the ticket.",
            "Low customer effort: fewer steps, clear updates.",
            "Following up so issues stay fixed.",
            "Feeding patterns back to the product team."
          ]
        },
        {
          q: "Tell me about a time you went above and beyond.",
          tip: "Pick a moment where you chose to do more than the process required.",
          framework: [
            "The customer's situation and what was expected of you.",
            "The extra step you chose to take and why.",
            "The customer's reaction and the business result.",
            "How it shaped your approach to service."
          ]
        }
      ]
    },
    "Registered Nurse": {
      icon: "🩺",
      questions: [
        {
          q: "Tell me about a critical situation with a patient.",
          tip: "Clinical judgment under pressure is what they are really asking about. Stay factual and calm.",
          framework: [
            "The clinical picture: what you observed and assessed.",
            "Your immediate actions in priority order (ABCs).",
            "How you communicated with the team and the family.",
            "The outcome and what you took from the experience."
          ]
        },
        {
          q: "How do you prioritize when you have multiple patients?",
          tip: "Show acuity-based thinking, not just task lists.",
          framework: [
            "Assess acuity first: who is unstable or deteriorating.",
            "Time-sensitive meds and treatments come next.",
            "Delegate appropriately within scope of practice.",
            "Reassess continuously — priorities change during a shift."
          ]
        },
        {
          q: "Describe a time you had to advocate for a patient.",
          tip: "Advocacy stories reveal your values. Show courage plus professionalism.",
          framework: [
            "What the patient needed and what stood in the way.",
            "How you raised the concern and to whom.",
            "How you stayed professional while being persistent.",
            "The outcome for the patient."
          ]
        },
        {
          q: "How do you handle conflicts with doctors or colleagues?",
          tip: "Healthcare is team-based. They want respectful assertiveness, not avoidance.",
          framework: [
            "Address it directly and privately, focused on patient safety.",
            "Use SBAR-style structured communication.",
            "Listen to their perspective before pushing yours.",
            "Escalate through the chain of command when safety is at stake."
          ]
        },
        {
          q: "How do you stay calm under pressure?",
          tip: "Give real techniques, not 'I just do.' Compartmentalization and routines matter.",
          framework: [
            "Fall back on training and protocols — muscle memory helps.",
            "One grounding technique you actually use (breathing, task focus).",
            "Debrief after the crisis instead of carrying it home.",
            "How you support colleagues who are struggling."
          ]
        },
        {
          q: "Tell me about a mistake you made and what you learned.",
          tip: "Honesty is non-negotiable in healthcare. Show accountability and systems thinking.",
          framework: [
            "What happened, stated plainly without minimizing.",
            "Immediate actions: patient safety first, then reporting.",
            "Root cause: what in the system allowed it.",
            "The lasting change in your practice."
          ]
        }
      ]
    },
    "Product Manager": {
      icon: "📦",
      questions: [
        {
          q: "How do you prioritize features on a roadmap?",
          tip: "There is no single right framework — they want to see structured thinking tied to goals.",
          framework: [
            "Start from company goals and the problem, not feature requests.",
            "Score with a simple model (RICE, effort vs impact) — and its limits.",
            "Weigh customer evidence: research, data, support themes.",
            "Communicate the 'why not' as clearly as the 'why'."
          ]
        },
        {
          q: "Tell me about a product decision you got wrong.",
          tip: "PMs are wrong often. Show you detect it fast and correct course.",
          framework: [
            "The decision, the bet behind it, and what you expected.",
            "The signal that told you it wasn't working.",
            "How quickly you changed course and what you did.",
            "What you changed in your decision process."
          ]
        },
        {
          q: "How do you work with engineers who push back?",
          tip: "Pushback is healthy. Show you treat engineers as partners, not ticket-takers.",
          framework: [
            "Assume good intent: dig into the concern behind the pushback.",
            "Share the 'why' — context turns resistance into collaboration.",
            "Negotiate scope, not quality: find the smaller shippable version.",
            "Give credit publicly when their pushback improves the outcome."
          ]
        },
        {
          q: "How do you define success for a new feature?",
          tip: "Vague success criteria are a PM red flag. Name the metric before you ship.",
          framework: [
            "The user problem in one sentence.",
            "Primary metric plus 1–2 counter-metrics.",
            "Targets set from baselines or benchmarks, not thin air.",
            "Review plan: when you'll check and what triggers a pivot."
          ]
        },
        {
          q: "Walk me through how you'd improve our product.",
          tip: "Research the company first. Structure beats a laundry list of ideas.",
          framework: [
            "What you observed as a user and one friction point.",
            "Who you'd talk to first (users, support, data).",
            "Your top bet and the smallest test to validate it.",
            "How you'd measure whether it worked."
          ]
        },
        {
          q: "Tell me about a time you said no to a stakeholder.",
          tip: "Saying no well is a core PM skill. Show empathy plus a clear rationale.",
          framework: [
            "The request and why it seemed reasonable on the surface.",
            "Your reasoning: data, strategy fit, or opportunity cost.",
            "How you delivered the no — and what you offered instead.",
            "How the relationship fared afterward."
          ]
        }
      ]
    },
    "Accountant": {
      icon: "🧮",
      questions: [
        {
          q: "How do you ensure accuracy in financial reports?",
          tip: "Accuracy is the whole job. Show layered controls, not just carefulness.",
          framework: [
            "Checklists and standardized close procedures.",
            "Reconciliations: tie every balance to a source.",
            "Review layers: self-review, then peer or manager review.",
            "Variance analysis to catch what looks off before it ships."
          ]
        },
        {
          q: "Tell me about a complex reconciliation you handled.",
          tip: "Pick one with real detective work. Methodical beats heroic.",
          framework: [
            "The accounts involved and the size of the discrepancy.",
            "Your step-by-step approach to isolating the difference.",
            "The root cause you found.",
            "The control you added so it can't recur."
          ]
        },
        {
          q: "How do you stay current with GAAP changes?",
          tip: "Show a system, not just good intentions.",
          framework: [
            "Professional sources you follow (FASB updates, AICPA).",
            "CPE courses targeted at your industry.",
            "How you assess impact on your company's statements.",
            "How you brief non-accountants on what changed."
          ]
        },
        {
          q: "Describe a time you found an error that mattered.",
          tip: "Material errors test integrity. Show you spoke up fast.",
          framework: [
            "How you spotted it and why it was material.",
            "Who you told and how quickly.",
            "The correction process and controls review.",
            "What you learned about where errors hide."
          ]
        },
        {
          q: "How do you handle tight month-end deadlines?",
          tip: "Close management is a process skill. Show you plan the close, not just survive it.",
          framework: [
            "A close calendar with owners and deadlines.",
            "What you pre-close or automate to shrink day-one work.",
            "Daily standups during close week to unblock issues.",
            "Post-close retro to make next month faster."
          ]
        },
        {
          q: "How do you explain financial data to non-finance colleagues?",
          tip: "Translation skill matters as much as technical skill in modern accounting.",
          framework: [
            "Start with the decision they need to make.",
            "One simple visual or comparison per point.",
            "Plain language: 'we spent more than planned because…'",
            "Offer the detail as backup, not the headline."
          ]
        }
      ]
    }
  };

  /* ================= Storage (safe wrapper) ================= */
  var memStore = {};
  var store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem('if_' + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) {
        return (key in memStore) ? memStore[key] : fallback;
      }
    },
    set: function (key, value) {
      try { window.localStorage.setItem('if_' + key, JSON.stringify(value)); }
      catch (e) { memStore[key] = value; }
    }
  };

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var FREE_DAILY = 5;

  function getStats() {
    return store.get('stats', { practiced: 0, mocks: 0, streak: 0, lastDay: null });
  }
  function saveStats(s) { store.set('stats', s); }

  function getDaily() {
    var d = store.get('daily', { date: todayStr(), used: 0 });
    if (d.date !== todayStr()) { d = { date: todayStr(), used: 0 }; store.set('daily', d); }
    return d;
  }
  function useDaily(n) {
    var d = getDaily();
    d.used += (n || 1);
    store.set('daily', d);
    return d;
  }
  function freeLeft() { return Math.max(0, FREE_DAILY - getDaily().used); }

  function touchStreak() {
    var s = getStats();
    var t = todayStr();
    if (s.lastDay !== t) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      var ys = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
      s.streak = (s.lastDay === ys) ? (s.streak + 1) : 1;
      s.lastDay = t;
      saveStats(s);
    }
  }

  /* ================= UI helpers ================= */
  function $(id) { return document.getElementById(id); }

  var toastTimer = null;
  function toast(msg) {
    var t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ================= Session state ================= */
  var S = {
    role: null,
    mode: null,          // 'practice' | 'mock'
    pool: [],            // question indices available this session
    pos: 0,              // position in pool (practice) or mockOrder (mock)
    mockOrder: [],
    mockScores: [],
    practicedThisQ: false,
    timerSecsTotal: 0,
    timerLeft: 0,
    timerId: null,
    timerLenMin: 2,
    selectedScore: 0
  };

  /* ================= Stats row ================= */
  function renderStats() {
    var s = getStats();
    setText('statPracticed', s.practiced);
    setText('statMocks', s.mocks);
    setText('statStreak', s.streak + (s.streak === 1 ? ' day' : ' days'));
    setText('statFreeLeft', freeLeft() + ' / ' + FREE_DAILY);
  }
  function setText(id, v) { var el = $(id); if (el) el.textContent = v; }

  /* ================= Setup view ================= */
  function buildRoleGrid() {
    var grid = $('roleGrid');
    if (!grid) return;
    grid.innerHTML = '';
    Object.keys(QUESTION_BANK).forEach(function (role) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'role-btn';
      b.dataset.role = role;
      b.innerHTML = '<span class="icon">' + QUESTION_BANK[role].icon + '</span><span>' + role + '</span>';
      b.addEventListener('click', function () {
        S.role = role;
        var all = grid.querySelectorAll('.role-btn');
        all.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        updateStartBtn();
      });
      grid.appendChild(b);
    });
  }

  function updateStartBtn() {
    var btn = $('startBtn');
    if (!btn) return;
    btn.disabled = !(S.role && S.mode);
    btn.textContent = !S.role ? 'Pick a role to start' : (!S.mode ? 'Pick practice or mock' : 'Start ' + (S.mode === 'mock' ? 'Mock Interview' : 'Practice'));
  }

  function selectMode(mode) {
    S.mode = mode;
    var p = $('modePractice'), m = $('modeMock');
    if (p) p.classList.toggle('active', mode === 'practice');
    if (m) m.classList.toggle('active', mode === 'mock');
    updateStartBtn();
  }

  /* ================= Timer ================= */
  function fmt(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function renderTimer() {
    var d = $('timerDisplay');
    if (!d) return;
    d.textContent = fmt(S.timerLeft);
    d.classList.toggle('warning', S.timerLeft <= 30 && S.timerLeft > 0);
    d.classList.toggle('done', S.timerLeft <= 0 && S.timerSecsTotal > 0);
  }

  function stopTimer() {
    if (S.timerId) { clearInterval(S.timerId); S.timerId = null; }
  }

  function resetTimer() {
    stopTimer();
    S.timerSecsTotal = S.timerLenMin * 60;
    S.timerLeft = S.timerSecsTotal;
    renderTimer();
    var sb = $('timerStart');
    if (sb) sb.textContent = 'Start timer';
  }

  function tickTimer() {
    if (S.timerLeft > 0) {
      S.timerLeft--;
      renderTimer();
      if (S.timerLeft === 0) {
        stopTimer();
        var sb = $('timerStart');
        if (sb) sb.textContent = 'Start timer';
        toast("Time's up! Wrap up your answer.");
      }
    }
  }

  function toggleTimer() {
    if (S.timerId) {
      stopTimer();
      var sb = $('timerStart');
      if (sb) sb.textContent = 'Resume';
      return;
    }
    if (S.timerLeft <= 0) resetTimer();
    S.timerId = setInterval(tickTimer, 1000);
    var sb2 = $('timerStart');
    if (sb2) sb2.textContent = 'Pause';
  }

  /* ================= Question rendering ================= */
  function currentQuestion() {
    var role = QUESTION_BANK[S.role];
    if (!role) return null;
    var idx = (S.mode === 'mock') ? S.mockOrder[S.pos] : S.pool[S.pos];
    return role.questions[idx];
  }

  function showQuestion() {
    var q = currentQuestion();
    if (!q) return;
    S.practicedThisQ = false;
    S.selectedScore = 0;

    var total = (S.mode === 'mock') ? S.mockOrder.length : QUESTION_BANK[S.role].questions.length;
    setText('qMeta', S.role + '  •  Question ' + (S.pos + 1) + ' of ' + total + (S.mode === 'mock' ? '  •  Mock interview' : ''));
    setText('qText', q.q);
    setText('tipText', q.tip);
    var fw = $('tipFramework');
    if (fw) {
      fw.innerHTML = '';
      q.framework.forEach(function (pt) {
        var li = document.createElement('li');
        li.textContent = pt;
        fw.appendChild(li);
      });
    }

    var tipsBox = $('tipsBox');
    if (tipsBox) tipsBox.classList.remove('open');
    var tt = $('tipsToggle');
    if (tt) tt.textContent = 'Show tips & answer framework';

    var ans = $('answerArea');
    if (ans) ans.value = '';

    ['starS', 'starT', 'starA', 'starR'].forEach(function (id) {
      var c = $(id);
      if (c) c.checked = false;
    });

    var sr = $('scoreRow');
    if (sr) {
      var btns = sr.querySelectorAll('.score-btn');
      btns.forEach(function (b) { b.classList.remove('active'); });
    }

    resetTimer();

    // Mock progress UI
    var mp = $('mockProgress');
    if (mp) mp.classList.toggle('hidden', S.mode !== 'mock');
    if (S.mode === 'mock') {
      setText('mockCount', 'Question ' + (S.pos + 1) + ' of ' + S.mockOrder.length);
      var fill = $('progressFill');
      if (fill) fill.style.width = Math.round((S.pos / S.mockOrder.length) * 100) + '%';
    }

    // Nav buttons: practice gets Next; mock gets Next until the last question,
    // then Finish. (nextBtn stays hidden in mock mode.)
    var next = $('nextBtn'), fin = $('endMockBtn'), mnext = $('mockNextBtn');
    var isLastMock = (S.mode === 'mock' && S.pos === S.mockOrder.length - 1);
    if (next) next.classList.toggle('hidden', S.mode !== 'practice');
    if (fin) fin.classList.toggle('hidden', !isLastMock);
    if (mnext) mnext.classList.toggle('hidden', !(S.mode === 'mock' && !isLastMock));
  }

  function markPracticed() {
    if (S.practicedThisQ) return;
    S.practicedThisQ = true;
    var s = getStats();
    s.practiced++;
    saveStats(s);
    touchStreak();
    renderStats();
  }

  /* ================= Session flow ================= */
  function showView(name) {
    ['setupView', 'sessionView', 'summaryView'].forEach(function (id) {
      var el = $(id);
      if (el) el.classList.toggle('hidden', id !== name);
    });
    window.scrollTo(0, 0);
  }

  function startSession() {
    if (!S.role || !S.mode) return;

    if (S.mode === 'mock') {
      // A mock interview reserves 5 free questions up front.
      if (freeLeft() < 5) { openUpgrade(); return; }
      useDaily(5);
      var idxs = QUESTION_BANK[S.role].questions.map(function (_, i) { return i; });
      S.mockOrder = shuffle(idxs).slice(0, 5);
      S.mockScores = [];
    } else {
      if (freeLeft() < 1) { openUpgrade(); return; }
      useDaily(1);
      var all = QUESTION_BANK[S.role].questions.map(function (_, i) { return i; });
      S.pool = shuffle(all);
    }
    S.pos = 0;
    showView('sessionView');
    showQuestion();
    renderStats();
  }

  function nextPractice() {
    markPracticed();
    if (S.pos + 1 >= S.pool.length) {
      // Reshuffle for another round through the bank.
      var all = QUESTION_BANK[S.role].questions.map(function (_, i) { return i; });
      S.pool = shuffle(all);
      S.pos = 0;
    } else {
      S.pos++;
    }
    if (freeLeft() < 1) { openUpgrade(); return; }
    useDaily(1);
    showQuestion();
    renderStats();
  }

  function nextMock() {
    markPracticed();
    if (S.selectedScore > 0) S.mockScores.push(S.selectedScore);
    if (S.pos + 1 >= S.mockOrder.length) { finishMock(); return; }
    S.pos++;
    showQuestion();
  }

  function finishMock() {
    stopTimer();
    var s = getStats();
    s.mocks++;
    saveStats(s);
    touchStreak();

    var avg = S.mockScores.length
      ? (S.mockScores.reduce(function (a, b) { return a + b; }, 0) / S.mockScores.length)
      : 0;
    setText('summaryScore', avg > 0 ? avg.toFixed(1) + ' / 5' : '—');
    setText('summaryQs', S.mockOrder.length + ' questions');
    setText('summaryStreak', getStats().streak + (getStats().streak === 1 ? ' day' : ' days'));

    var note = $('summaryNote');
    if (note) {
      if (avg >= 4) note.textContent = "Outstanding — you're interview-ready. Keep the streak alive and walk in confident.";
      else if (avg >= 3) note.textContent = "Solid foundation. Review the STAR checklists on your weaker answers and run another mock tomorrow.";
      else if (avg > 0) note.textContent = "Good reps. Focus on the 'what interviewers look for' tips, tighten your STAR stories, and practice daily.";
      else note.textContent = "Reps completed. Next time, score each answer honestly — tracking scores is how you see real progress.";
    }
    var fill = $('progressFill');
    if (fill) fill.style.width = '100%';
    showView('summaryView');
    renderStats();
  }

  /* ================= Upgrade modal ================= */
  function openUpgrade() {
    var m = $('upgradeModal');
    if (m) m.classList.add('open');
  }
  function closeUpgrade() {
    var m = $('upgradeModal');
    if (m) m.classList.remove('open');
  }

  /* ================= Wire up ================= */
  function init() {
    buildRoleGrid();
    renderStats();

    var mp = $('modePractice'), mm = $('modeMock');
    if (mp) mp.addEventListener('click', function () { selectMode('practice'); });
    if (mm) mm.addEventListener('click', function () { selectMode('mock'); });

    var start = $('startBtn');
    if (start) start.addEventListener('click', startSession);

    // Timer length + controls
    var lens = document.querySelectorAll('[data-timer-min]');
    lens.forEach(function (b) {
      b.addEventListener('click', function () {
        S.timerLenMin = parseInt(b.dataset.timerMin, 10) || 2;
        lens.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        resetTimer();
      });
    });
    var ts = $('timerStart');
    if (ts) ts.addEventListener('click', toggleTimer);
    var tr = $('timerReset');
    if (tr) tr.addEventListener('click', resetTimer);

    // Tips toggle
    var tipsToggle = $('tipsToggle');
    if (tipsToggle) tipsToggle.addEventListener('click', function () {
      var box = $('tipsBox');
      if (!box) return;
      var open = box.classList.toggle('open');
      tipsToggle.textContent = open ? 'Hide tips & answer framework' : 'Show tips & answer framework';
    });

    // Self-score buttons
    var sr = $('scoreRow');
    if (sr) {
      sr.querySelectorAll('.score-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          S.selectedScore = parseInt(b.dataset.score, 10) || 0;
          sr.querySelectorAll('.score-btn').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
        });
      });
    }

    // Navigation
    var next = $('nextBtn');
    if (next) next.addEventListener('click', nextPractice);
    var mnext = $('mockNextBtn');
    if (mnext) mnext.addEventListener('click', nextMock);
    var fin = $('endMockBtn');
    if (fin) fin.addEventListener('click', nextMock);

    // Summary buttons
    var sp = $('summaryPracticeBtn');
    if (sp) sp.addEventListener('click', function () {
      S.mode = 'practice'; selectMode('practice'); startSession();
    });
    var sro = $('summaryRolesBtn');
    if (sro) sro.addEventListener('click', function () { showView('setupView'); });

    // Upgrade modal
    var uc = $('upgradeClose');
    if (uc) uc.addEventListener('click', closeUpgrade);
    var backdrop = $('upgradeModal');
    if (backdrop) backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeUpgrade();
    });

    updateStartBtn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Expose internals for automated verification (harmless in production). */
  window.__IF__ = { QUESTION_BANK: QUESTION_BANK, FREE_DAILY: FREE_DAILY, store: store };
})();
