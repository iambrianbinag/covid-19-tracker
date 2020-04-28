function calculatePercentage(partialValue, totalValue) {
  return ((100 * partialValue) / totalValue).toFixed(2);
}

// Accept object parameter which each element converted to object and wraps in an array
function arrayWrapper(data) {
  const array = [];
  for (let key in data) {
    array.push([{ [key]: data[key] }]);
  }

  return array;
}

/* SPECIFICALLY USED FOR CHART AND USING API RESPONSE JSON FORMAT */

// Used to calculate date range and get total value for the Chart
function compressedTimelineDataForChart(data, attr, limitNumber) {
  const dataCountries = []; // Wrapper for timeline per country

  // Insert in array dataCountries in every elements of given data
  data.forEach((country) => {
    dataCountries.push(arrayWrapper(country.timeline[attr])); // Return array of object
  });

  const overallTotalDays = []; // Overall total countries days with the range of limitNumber parameter
  const overallTotalData = []; // Overall total countries data with the range of limitNumber parameter

  const totalDays = []; // Storage for total days of country
  const totalData = []; // Storage for total data of country

  // Calculate data of countries
  dataCountries.forEach((data) => {
    const totalLimitDays = []; // Storage for "limitNumber" days
    const totalLimitData = []; // Storage for "limitNumber" data

    let _daysContainer = []; // Container for _days variable, being used for processing logic
    let _dataContainer = []; // Container for _data variable, being used for processing logic

    let _days = []; // Container for each day
    let _data = []; // Container for each data

    let counterBreaker = limitNumber; // Limit number of data

    // Iterate data per country
    data.forEach((eachData, index) => {
      let key = ""; // Storage of object key
      for (let objectKey in eachData[0]) {
        // Get object key
        key = objectKey;
      }

      if (index < counterBreaker) {
        // If data is not equal to LimitNumber
        _days.push(key);
        _data.push(eachData[0][key]);

        if (data.length - 1 === index) {
          _daysContainer = _days;
          _dataContainer = _data;

          totalLimitDays.push(_daysContainer);
          totalLimitData.push(_dataContainer);
        }
      } else if (index === counterBreaker) {
        // If data is equal to LimitNumber
        _daysContainer = _days;
        _dataContainer = _data;

        _days = [];
        _data = [];

        _days.push(key);
        _data.push(eachData[0][key]);
      } else {
        // If data is greater than LimitNumber
        _days.push(key);
        _data.push(eachData[0][key]);

        totalLimitDays.push(_daysContainer);
        totalLimitData.push(_dataContainer);

        _daysContainer = [];
        _dataContainer = [];

        counterBreaker += limitNumber; // Add limitNumber
      }
    });

    totalDays.push({ countryDays: totalLimitDays });
    totalData.push({ countryData: totalLimitData });
  });

  // Calculate final overall days
  totalDays[0].countryDays.forEach((days) => {
    overallTotalDays.push(`${days[0]}-${days[days.length - 1]}`);
  });

  // Calculate final overall data
  totalData.forEach((countries) => {
    countries.countryData.forEach((values, index) => {
      overallTotalData[index] = overallTotalData[index]
        ? (overallTotalData[index] += values[values.length - 1])
        : values[values.length - 1];
    });
  });

  return { daysRange: overallTotalDays, value: overallTotalData };
}

export default {
  calculatePercentage,
  arrayWrapper,
  compressedTimelineDataForChart,
};
