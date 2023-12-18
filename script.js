const fuelCostsContainer = document.getElementById('fuelCostsContainer');
let data = [];
let modifiedData = [];

const calculateTotalForEntry = (entry) => {
  return entry.solidFuels + entry.gas + entry.electricity + entry.liquidFuels;
};

document.getElementById('dark').addEventListener('click', () => {
  const mainBody = document.getElementById('mainBodyForBackground');
  mainBody.classList.remove('lightMood');
  mainBody.classList.add('darkMode');
});

document.getElementById('light').addEventListener('click', () => {
  const mainBody = document.getElementById('mainBodyForBackground');
  mainBody.classList.remove('darkMode');
  mainBody.classList.add('lightMood');
});


document.addEventListener('DOMContentLoaded', function () {
  const fetchDataAndCalculateTotal = async () => {
    try {
      const response = await fetch('data.json');
      data = await response.json();
      modifiedData = data;

      document.getElementById('filterElement').addEventListener('change', async () => {
        const selectedValue = document.getElementById('filterElement').value;

        if (selectedValue === 'solidFuels') {
          modifiedData = data.map(entry => ({
            ...entry,
            solidFuels: entry.solidFuels,
            gas: null,
            liquidFuels: null,
            electricity: null
          }));
        } else if (selectedValue === 'gas') {
          modifiedData = data.map(entry => ({
            ...entry,
            gas: entry.gas,
            solidFuels: null,
            liquidFuels: null,
            electricity: null
          }));
        } else if (selectedValue === 'electricity') {
          modifiedData = data.map(entry => ({
            ...entry,
            electricity: entry.electricity,
            solidFuels: null,
            gas: null,
            liquidFuels: null
          }));
        } else if (selectedValue === 'liquidFuels') {
          modifiedData = data.map(entry => ({
            ...entry,
            liquidFuels: entry.liquidFuels,
            solidFuels: null,
            gas: null,
            electricity: null
          }));
        } else {
          data = await response.json();
        }

        const uniqueYears = [...new Set(data.map(entry => entry.Year))];
        uniqueYears.forEach(year => {
          const yearData = modifiedData.filter(entry => entry.Year === year);
          createChartForYear(yearData, year);
        });
      });

      const uniqueYears = [...new Set(data.map(entry => entry.Year))];
      uniqueYears.forEach(year => {
        const yearData = data.filter(entry => entry.Year === year);
        createChartForYear(yearData, year);
      })
    } catch (error) {
    }
  };

  const createChartForYear = (yearData, year) => {
    // Functionality for Forecast
    let yearDataForHistorical = yearData;
    const canvas = document.createElement('canvas');
    canvas.id = `chart-${year}`;
    canvas.width = 800; // Set canvas width
    canvas.height = 550; // Set canvas height
    const container = document.getElementById('chartsContainer');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const labels = yearDataForHistorical.map(entry => entry.Month);
    const solidFuelsData = yearDataForHistorical.map(entry => entry.solidFuels);
    const gasData = yearDataForHistorical.map(entry => entry.gas);
    const electricityData = yearDataForHistorical.map(entry => entry.electricity);
    const liquidFuelsData = yearDataForHistorical.map(entry => entry.liquidFuels);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Solid Fuels',
            data: solidFuelsData,
            borderColor: solidFuelsData && solidFuelsData.length > 0 ? 'red' : 'transparent',
            fill: false
          },
          {
            label: 'Gas',
            data: gasData,
            borderColor: gasData && gasData.length > 0 ? 'blue' : 'transparent',
            fill: false
          },
          {
            label: 'Electricity',
            data: electricityData,
            borderColor: electricityData && electricityData.length > 0 ? 'green' : 'transparent',
            fill: false
          },
          {
            label: 'Liquid Fuels',
            data: liquidFuelsData,
            borderColor: liquidFuelsData && liquidFuelsData.length > 0 ? 'orange' : 'transparent',
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: `Year ${year}`
        }
        // Other chart options if needed
      }
    });

  };

  fetchDataAndCalculateTotal();
});
document.querySelectorAll('.exchangeingButton').forEach(button => {
  button.addEventListener('click', function () {

    var modal = document.getElementById("myModalChartView");
      var acknowledgeBtn = document.getElementById("acknowledgeBtnchartView");
      function displayModal() {
        modal.style.display = "block";
      }
      acknowledgeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });
      displayModal();
    document.querySelectorAll('.exchangeingButton').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  });
});
document.querySelectorAll('.exchangeingButtonMood').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.exchangeingButtonMood').forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');
  });
});
document.getElementById('Forecast').classList.add('active');
document.getElementById('light').classList.add('active');
function disableScroll() {
  const chartPat = document.getElementById('chartsContainer');
  chartPat.classList.add('theChartParentWithoutScroll');
  chartPat.classList.remove('theChartParentWithScroll');
}

function enableScroll() {
  document.body.style.overflow = 'auto';
  const chartPat = document.getElementById('chartsContainer');
  chartPat.classList.add('theChartParentWithScroll');
  chartPat.classList.remove('theChartParentWithoutScroll');
}

document.addEventListener('DOMContentLoaded', function () {
  let isForecastMode = true;
  const toggleForecastMode = () => {
    if (isForecastMode) {
      disableScroll();
    } else {
      enableScroll();
    }
  };
  document.getElementById('Forecast').addEventListener('click', () => {
    isForecastMode = true;
    toggleForecastMode();
  });

  document.getElementById('Historical').addEventListener('click', () => {
    isForecastMode = false;
    toggleForecastMode();
  });
  toggleForecastMode();
});


document.addEventListener('DOMContentLoaded', function () {
  const chartContainer = document.getElementById('chartsContainer');

  let maxScrollLeft = 8000;

  chartContainer.addEventListener('scroll', () => {
    const currentScroll = chartContainer.scrollLeft;
    // Check if scrolling forward beyond the current month
    if (currentScroll > maxScrollLeft) {
      chartContainer.scrollTo({
        left: maxScrollLeft,
        behavior: 'smooth'
      });
      var modal = document.getElementById("myModal");
      var acknowledgeBtn = document.getElementById("acknowledgeBtn");
      function displayModal() {
        modal.style.display = "block";
      }
      acknowledgeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        maxScrollLeft = 80000;
      });
      displayModal();

    }
    if (currentScroll < 1000) {
      maxScrollLeft = 8000;
    }
  });
});


// data.forEach(entry => {
//   const totalCostForEntry = calculateTotalForEntry(entry);
//   const divElement = document.createElement('div');
//   divElement.classList.add('sidebarElement');
//   const paragraphElement = document.createElement('div');
//   paragraphElement.style.display = 'flex';
//   paragraphElement.style.justifyContent = 'center';
//   paragraphElement.textContent = `Heating fuel cost ${entry.Month} ${entry.Year}: $${totalCostForEntry}`;
//   divElement.appendChild(paragraphElement);
//   fuelCostsContainer.appendChild(divElement);

//   console.log(`Total Heating Fuel Costs for ${entry.Month} ${entry.Year}:`, totalCostForEntry);
// });