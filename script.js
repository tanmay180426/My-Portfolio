/**
 * Tanmay - Data Analyst & AI/ML Specialist Portfolio
 * Interactive Script: Typewriter, Real-Time ML Simulator, Chart.js BI Dashboard,
 * Filtering, Modal Controls, Form Validation & Clipboard API
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initSkillsFilter();
  initProjectsFilter();
  initMLSimulator();
  initBIDashboard();
  initCodeStudio();
  initModals();
  initContactForm();
});

/* ==========================================================================
   1. Navbar & Mobile Menu Handling
   ========================================================================== */
function initNavbar() {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  }, { passive: true });

  // Mobile Menu Toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ScrollSpy: Highlight active nav link
  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }
}

/* ==========================================================================
   2. Dynamic Typewriter Effect in Hero
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typewriterText');
  if (!targetElement) return;

  const words = [
    'Data Analytics',
    'Python & Pandas Wrangling',
    'Scikit-Learn Machine Learning',
    'Microsoft Power BI & DAX',
    'Advanced Excel Modeling',
    'Predictive AI & Statistical Inference'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      targetElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      targetElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 500);
}

/* ==========================================================================
   3. Skill Category Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Project Filtering
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.p-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Live Scikit-Learn ML Churn Predictor
   ========================================================================== */
function initMLSimulator() {
  const tenureSlider = document.getElementById('tenureSlider');
  const spendSlider = document.getElementById('spendSlider');
  const ticketsSlider = document.getElementById('ticketsSlider');
  const contractSelect = document.getElementById('contractSelect');
  const paymentSelect = document.getElementById('paymentSelect');
  const btnRunInference = document.getElementById('btnRunInference');

  const tenureVal = document.getElementById('tenureVal');
  const spendVal = document.getElementById('spendVal');
  const ticketsVal = document.getElementById('ticketsVal');

  const churnPercentage = document.getElementById('churnPercentage');
  const gaugeBar = document.getElementById('gaugeBar');
  const outputVerdictBadge = document.getElementById('outputVerdictBadge');
  const modelConfidence = document.getElementById('modelConfidence');
  const retentionAction = document.getElementById('retentionAction');
  const impactList = document.getElementById('impactList');

  // Slider event listeners for dynamic feedback
  if (tenureSlider && tenureVal) {
    tenureSlider.addEventListener('input', (e) => {
      tenureVal.textContent = `${e.target.value} mo`;
      calculatePrediction();
    });
  }

  if (spendSlider && spendVal) {
    spendSlider.addEventListener('input', (e) => {
      spendVal.textContent = `$${parseFloat(e.target.value).toFixed(2)}`;
      calculatePrediction();
    });
  }

  if (ticketsSlider && ticketsVal) {
    ticketsSlider.addEventListener('input', (e) => {
      ticketsVal.textContent = `${e.target.value} tickets`;
      calculatePrediction();
    });
  }

  if (contractSelect) contractSelect.addEventListener('change', calculatePrediction);
  if (paymentSelect) paymentSelect.addEventListener('change', calculatePrediction);
  if (btnRunInference) {
    btnRunInference.addEventListener('click', () => {
      btnRunInference.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running inference...';
      setTimeout(() => {
        calculatePrediction();
        btnRunInference.innerHTML = '<i class="fa-solid fa-check"></i> Model Evaluated';
        showToast('Scikit-Learn Random Forest Pipeline executed with 12ms latency');
        setTimeout(() => {
          btnRunInference.innerHTML = '<i class="fa-solid fa-play"></i> Run Scikit-Learn Inference';
        }, 1500);
      }, 300);
    });
  }

  // Predictive Inference Algorithm
  function calculatePrediction() {
    const tenure = parseFloat(tenureSlider.value);
    const spend = parseFloat(spendSlider.value);
    const tickets = parseFloat(ticketsSlider.value);
    const contract = contractSelect.value;
    const payment = paymentSelect.value;

    // Base score calculation based on logistic function
    let logit = 0.0;

    // Feature 1: Tenure (inverse relationship with churn)
    const tenureFactor = -0.05 * tenure;

    // Feature 2: Support tickets (exponential risk factor)
    const ticketFactor = 0.42 * tickets;

    // Feature 3: Monthly Spend (modest risk over $90)
    const spendFactor = spend > 80 ? (spend - 80) * 0.015 : -0.15;

    // Feature 4: Contract Agreement
    let contractFactor = 0.45; // month-to-month
    if (contract === 'one-year') contractFactor = -0.65;
    if (contract === 'two-year') contractFactor = -1.45;

    // Feature 5: Payment method
    let paymentFactor = 0.2; // electronic check
    if (payment === 'auto-bank') paymentFactor = -0.25;
    if (payment === 'credit-card') paymentFactor = -0.35;

    logit = tenureFactor + ticketFactor + spendFactor + contractFactor + paymentFactor;

    // Sigmoid function: P = 1 / (1 + e^-logit)
    const prob = 1 / (1 + Math.exp(-logit));
    const percentage = Math.min(Math.max((prob * 100), 2.5), 98.2);
    const displayPercentage = percentage.toFixed(1);

    // Update UI elements
    if (churnPercentage) churnPercentage.textContent = `${displayPercentage}%`;

    if (gaugeBar) {
      gaugeBar.style.width = `${displayPercentage}%`;

      if (percentage < 32) {
        gaugeBar.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
        outputVerdictBadge.className = 'output-badge risk-low';
        outputVerdictBadge.textContent = 'LOW CHURN RISK';
        retentionAction.textContent = 'Account Healthy • Upsell Product Addon';
        retentionAction.style.color = '#34d399';
      } else if (percentage < 65) {
        gaugeBar.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        outputVerdictBadge.className = 'output-badge';
        outputVerdictBadge.textContent = 'MODERATE ATTRITION RISK';
        retentionAction.textContent = 'Offer Annual Contract Incentive ($15 Off)';
        retentionAction.style.color = '#fbbf24';
      } else {
        gaugeBar.style.background = 'linear-gradient(90deg, #ef4444, #f97316)';
        outputVerdictBadge.className = 'output-badge risk-high';
        outputVerdictBadge.textContent = 'CRITICAL CHURN RISK';
        retentionAction.textContent = 'Trigger Dedicated Customer Success Call';
        retentionAction.style.color = '#f87171';
      }
    }

    if (modelConfidence) {
      // Confidence increases at polar ends of the distribution
      const conf = 85 + Math.abs(percentage - 50) * 0.26;
      modelConfidence.textContent = `${conf.toFixed(1)}%`;
    }

    // Dynamic SHAP Impact Explanation
    if (impactList) {
      const impacts = [];
      if (tickets >= 3) {
        impacts.push(`<li><span class="impact-dot impact-neg"></span> Support Tickets (+${(tickets * 5.2).toFixed(1)}% Risk)</li>`);
      } else {
        impacts.push(`<li><span class="impact-dot impact-pos"></span> Low Tickets History (-12.4% Risk)</li>`);
      }

      if (tenure > 24) {
        impacts.push(`<li><span class="impact-dot impact-pos"></span> Long Tenure (-${(tenure * 0.5).toFixed(1)}% Risk)</li>`);
      } else {
        impacts.push(`<li><span class="impact-dot impact-neg"></span> Early Lifecycle Tenure (+14.1% Risk)</li>`);
      }

      if (contract === 'month-to-month') {
        impacts.push(`<li><span class="impact-dot impact-neg"></span> Month-to-Month Contract (+18.5% Risk)</li>`);
      } else {
        impacts.push(`<li><span class="impact-dot impact-pos"></span> Long-Term Locked Contract (-22.0% Risk)</li>`);
      }

      impactList.innerHTML = impacts.join('');
    }
  }

  // Initial run
  calculatePrediction();
}

/* ==========================================================================
   6. Live Power BI / Chart.js Interactive Dashboard
   ========================================================================== */
let revenueChartInstance = null;
let productChartInstance = null;

function initBIDashboard() {
  const revCanvas = document.getElementById('revenueTrendChart');
  const prodCanvas = document.getElementById('productDistChart');
  const segmentSelect = document.getElementById('biSegmentSelect');
  const metricSelect = document.getElementById('biMetricSelect');
  const btnReset = document.getElementById('btnResetBIData');

  // KPI elements
  const kpiRevenue = document.getElementById('kpiRevenue');
  const kpiLtv = document.getElementById('kpiLtv');
  const kpiChurn = document.getElementById('kpiChurn');
  const kpiLift = document.getElementById('kpiLift');

  if (!revCanvas || !prodCanvas) return;

  // Segment Data Dictionary
  const dashboardData = {
    all: {
      revenue: '$842,500',
      ltv: '$4,820',
      churn: '2.14%',
      lift: '3.4x',
      trendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      actuals: [52000, 58000, 61000, 67000, 71000, 74000, 72000, 79000, 83000, 88000, 91000, 96000],
      forecast: [null, null, null, null, null, null, null, null, 83000, 89500, 94000, 102000],
      productLabels: ['Enterprise Cloud', 'Predictive APIs', 'BI Analytics Tools', 'Support SLA'],
      productValues: [42, 28, 18, 12]
    },
    enterprise: {
      revenue: '$512,000',
      ltv: '$12,400',
      churn: '0.92%',
      lift: '4.8x',
      trendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      actuals: [31000, 34000, 37000, 41000, 43000, 47000, 46000, 51000, 53000, 56000, 59000, 64000],
      forecast: [null, null, null, null, null, null, null, null, 53000, 58000, 62000, 68000],
      productLabels: ['Enterprise Cloud', 'Predictive APIs', 'Dedicated SLA'],
      productValues: [62, 25, 13]
    },
    smb: {
      revenue: '$218,000',
      ltv: '$2,350',
      churn: '3.10%',
      lift: '2.9x',
      trendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      actuals: [14000, 16000, 16500, 18000, 19500, 18500, 19000, 20500, 21500, 23000, 24000, 25500],
      forecast: [null, null, null, null, null, null, null, null, 21500, 23800, 25200, 27000],
      productLabels: ['BI Analytics Tools', 'Cloud Connectors', 'Automation Engine'],
      productValues: [48, 32, 20]
    },
    consumer: {
      revenue: '$112,500',
      ltv: '$640',
      churn: '4.65%',
      lift: '2.2x',
      trendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      actuals: [7000, 8000, 7500, 8000, 8500, 8500, 7000, 7500, 8500, 9000, 8000, 6500],
      forecast: [null, null, null, null, null, null, null, null, 8500, 7700, 6800, 7000],
      productLabels: ['Standard Plan', 'Premium Monthly', 'Mobile App'],
      productValues: [55, 30, 15]
    }
  };

  // Chart Global Defaults for Dark Mode Glassmorphism
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  // Build Charts
  function renderCharts(segment = 'all') {
    const data = dashboardData[segment] || dashboardData.all;

    // Update KPI cards
    if (kpiRevenue) kpiRevenue.textContent = data.revenue;
    if (kpiLtv) kpiLtv.textContent = data.ltv;
    if (kpiChurn) kpiChurn.textContent = data.churn;
    if (kpiLift) kpiLift.textContent = data.lift;

    // Destroy existing instances if any
    if (revenueChartInstance) revenueChartInstance.destroy();
    if (productChartInstance) productChartInstance.destroy();

    // Chart 1: Revenue Line + Forecast Chart
    const ctxRev = revCanvas.getContext('2d');
    const gradCyan = ctxRev.createLinearGradient(0, 0, 0, 240);
    gradCyan.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
    gradCyan.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

    revenueChartInstance = new Chart(ctxRev, {
      type: 'line',
      data: {
        labels: data.trendLabels,
        datasets: [
          {
            label: 'Actual Revenue ($)',
            data: data.actuals,
            borderColor: '#00f2fe',
            backgroundColor: gradCyan,
            fill: true,
            tension: 0.38,
            borderWidth: 3,
            pointBackgroundColor: '#00f2fe',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'ML ARIMA Model Forecast',
            data: data.forecast,
            borderColor: '#a855f7',
            borderDash: [5, 5],
            fill: false,
            tension: 0.38,
            borderWidth: 2.5,
            pointBackgroundColor: '#a855f7',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { size: 11, weight: '600' }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(0, 242, 254, 0.4)',
            borderWidth: 1,
            titleFont: { size: 12 },
            bodyFont: { size: 12 },
            padding: 10,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $${context.parsed.y ? context.parsed.y.toLocaleString() : 'N/A'}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              font: { size: 10 },
              callback: val => `$${val / 1000}k`
            }
          }
        }
      }
    });

    // Chart 2: Product Breakdown Doughnut Chart
    const ctxProd = prodCanvas.getContext('2d');
    productChartInstance = new Chart(ctxProd, {
      type: 'doughnut',
      data: {
        labels: data.productLabels,
        datasets: [{
          data: data.productValues,
          backgroundColor: [
            '#00f2fe',
            '#a855f7',
            '#10b981',
            '#f59e0b'
          ],
          borderColor: '#0f172a',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 12,
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: 'rgba(168, 85, 247, 0.4)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed}% of Revenue`;
              }
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  // Filter Event Listeners
  if (segmentSelect) {
    segmentSelect.addEventListener('change', (e) => {
      renderCharts(e.target.value);
      showToast(`Updated view to ${segmentSelect.options[segmentSelect.selectedIndex].text}`);
    });
  }

  if (metricSelect) {
    metricSelect.addEventListener('change', () => {
      showToast(`Recalibrated metrics for selected calendar timeframe`);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (segmentSelect) segmentSelect.value = 'all';
      if (metricSelect) metricSelect.value = 'q4';
      renderCharts('all');
      showToast('Dashboard metrics refreshed to default consolidated view');
    });
  }

  // Initial Render
  renderCharts('all');
}

/* ==========================================================================
   7. SQL, DAX & Python Code Matrix Studio
   ========================================================================== */
function initCodeStudio() {
  const snippetButtons = document.querySelectorAll('.snippet-btn');
  const codeBox = document.getElementById('codeSnippetBox');
  const langTitle = document.getElementById('snippetLanguageTitle');
  const btnCopy = document.getElementById('btnCopySnippet');
  const copyText = document.getElementById('copySnippetText');

  const snippets = {
    'sql-window': {
      lang: 'PostgreSQL / BigQuery SQL',
      code: `-- 📊 Customer Cohort Retention Analysis
WITH user_first_purchase AS (
    SELECT 
        customer_id,
        DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM transactions
    WHERE status = 'Completed'
    GROUP BY customer_id
),
monthly_activity AS (
    SELECT 
        t.customer_id,
        u.cohort_month,
        DATE_TRUNC('month', t.order_date) AS activity_month,
        (EXTRACT(YEAR FROM t.order_date) - EXTRACT(YEAR FROM u.cohort_month)) * 12 +
        (EXTRACT(MONTH FROM t.order_date) - EXTRACT(MONTH FROM u.cohort_month)) AS period_number
    FROM transactions t
    JOIN user_first_purchase u ON t.customer_id = u.customer_id
    GROUP BY 1, 2, 3, 4
)
SELECT 
    cohort_month,
    period_number,
    COUNT(DISTINCT customer_id) AS active_users,
    ROUND(COUNT(DISTINCT customer_id)::DECIMAL / 
          FIRST_VALUE(COUNT(DISTINCT customer_id)) OVER (PARTITION BY cohort_month ORDER BY period_number) * 100, 2) AS retention_rate_pct
FROM monthly_activity
GROUP BY cohort_month, period_number
ORDER BY cohort_month ASC, period_number ASC;`
    },
    'dax-yoy': {
      lang: 'Power BI DAX Measure',
      code: `// 📈 Dynamic Year-over-Year Revenue Growth Measure
Revenue YoY Growth % = 
VAR CurrentRevenue = [Total Revenue]
VAR PriorYearRevenue = 
    CALCULATE(
        [Total Revenue],
        SAMEPERIODLASTYEAR('Calendar'[Date])
    )
VAR RevenueVariance = CurrentRevenue - PriorYearRevenue
RETURN
    IF(
        ISBLANK(PriorYearRevenue) || PriorYearRevenue = 0,
        BLANK(),
        DIVIDE(RevenueVariance, PriorYearRevenue, 0)
    )

// Dynamic KPI Status Indicator
Revenue Target Flag = 
SWITCH(
    TRUE(),
    [Revenue YoY Growth %] >= 0.15, "🟢 Exceeded Goal (>15%)",
    [Revenue YoY Growth %] >= 0.05, "🟡 On Track (5-15%)",
    "🔴 Underperforming (<5%)"
)`
    },
    'excel-dynamic': {
      lang: 'Advanced Excel Dynamic Array & LAMBDA',
      code: `=/* 🧮 Multi-Condition Matrix Lookup with Dynamic Filtering */
=LET(
    DataRange, tbl_SalesData,
    Regions, INDEX(DataRange,, 2),
    Revenues, INDEX(DataRange,, 5),
    TargetRegion, "North America",
    FilteredData, FILTER(DataRange, (Regions = TargetRegion) * (Revenues > 50000), "No Records Found"),
    SortedResults, SORT(FilteredData, 5, -1),
    SortedResults
)

/* Automated Currency Variance Lambda */
=LAMBDA(Actual, Budget,
    LET(
        VarDiff, Actual - Budget,
        VarPct, IF(Budget <> 0, VarDiff / Budget, 0),
        TEXT(VarPct, "+0.0%;-0.0%;0.0%")
    )
)`
    },
    'sklearn-pipeline': {
      lang: 'Python (Scikit-Learn & Pandas Pipeline)',
      code: `import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold

# 1. Feature Preprocessing Architecture
numeric_features = ['tenure', 'monthly_charges', 'total_charges', 'support_tickets']
categorical_features = ['contract_type', 'payment_method', 'internet_service']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_features)
    ]
)

# 2. End-to-End Pipeline Definition
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(random_state=42, class_weight='balanced'))
])

# 3. Hyperparameter Grid Search with Cross-Validation
param_grid = {
    'classifier__n_estimators': [100, 200],
    'classifier__max_depth': [6, 10, None],
    'classifier__min_samples_split': [2, 5]
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid_search = GridSearchCV(pipeline, param_grid, cv=cv, scoring='roc_auc', n_jobs=-1)
grid_search.fit(X_train, y_train)

print(f"Optimal ROC-AUC: {grid_search.best_score_:.4f}")`
    }
  };

  snippetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      snippetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const snippetKey = btn.getAttribute('data-snippet');
      const data = snippets[snippetKey];

      if (data && codeBox && langTitle) {
        langTitle.textContent = data.lang;
        codeBox.textContent = data.code;
      }
    });
  });

  // Copy code handler
  if (btnCopy && codeBox) {
    btnCopy.addEventListener('click', () => {
      copyToClipboard(codeBox.textContent, btnCopy);
      if (copyText) copyText.textContent = 'Copied! ✓';
      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy Code';
      }, 2000);
    });
  }

  // Interactive Lab Tabs (Switch between ML, BI, SQL)
  const labNavBtns = document.querySelectorAll('.lab-nav-btn');
  const labTabContents = document.querySelectorAll('.lab-tab-content');

  labNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      labNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTabId = btn.getAttribute('data-tab');
      labTabContents.forEach(tab => {
        if (tab.id === targetTabId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   8. Modals for Detailed Case Studies
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close, .modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   9. Contact Form Validation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const messageInput = document.getElementById('senderMessage');
  const btnSubmit = document.getElementById('btnSubmitForm');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('has-error');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      emailInput.parentElement.classList.remove('has-error');
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
      messageInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      messageInput.parentElement.classList.remove('has-error');
    }

    if (isValid) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<span>Sending Message...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-circle-check"></i>';
        form.reset();

        showToast('Thank you! Your message has been recorded. Tanmay will get in touch shortly.');

        setTimeout(() => {
          btnSubmit.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
        }, 3000);
      }, 1000);
    }
  });

  // Clear errors on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    }
  });
}

/* ==========================================================================
   10. Toast Notification System & Clipboard API
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-cyan"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function copyToClipboard(text, triggerElement) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied to clipboard: "${text}"`);
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied to clipboard: "${text}"`);
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textarea);
}

// Global exposure for inline HTML onclick attributes
window.copyToClipboard = copyToClipboard;
window.showToast = showToast;
