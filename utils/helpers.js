const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateLinechart = (array) => {
  const numMonths = 6; // temp
  const currentMonth = new Date().getMonth();

  let diff = 12 - numMonths;

  const labels = [];
  for (var i = 0; i <= numMonths; i--) {
    labels.push(months[currentMonth - i]);
  }

  const data = [];
  for (let i = 0; i < numMonths; i++) data.push(0);

  array.forEach((item) => {
    const itemMonth = new Date(item.created_at).getMonth();

    const index = currentMonth - itemMonth;
    data[index] = data[index] + item.amount;
  });
};

export default {};
