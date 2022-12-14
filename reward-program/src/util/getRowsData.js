export default function getRowsData(name,rowinfo) {
    let total_rows = 0;
    let month_rows = {};

    var months = [
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
    const month_name = Object.keys(rowinfo.month).sort(function (a, b) {
        return months.indexOf(a) - months.indexOf(b);
    });

    function calculateRows() {
        Object.keys(rowinfo.month).forEach((month) => {
            month_rows[month] = rowinfo.month[month].transaction.length;
            total_rows += rowinfo.month[month].transaction.length;
        });
    }
    calculateRows();

    const rows = [];
    let cur_month_index = 0;
    let date_index = 1;
    let previous_rows_numbers = 0;
    for (let i = 0; i < total_rows; i++) {
        if (i === 0) {
            const cur_rows = [];
            cur_rows.push([name, total_rows]);
            cur_rows.push([month_name[0], month_rows[month_name[0]]]);
            cur_rows.push([
                rowinfo.month[month_name[0]].transaction[0].date,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[0]].transaction[0].amount,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[0]].transaction[0].points,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[0]].total,
                month_rows[month_name[0]],
            ]);
            cur_rows.push([rowinfo.total, total_rows]);
            rows.push(cur_rows);
        } else if (
            month_rows[month_name[cur_month_index]] + previous_rows_numbers <
            i + 1
        ) {
            previous_rows_numbers += month_rows[month_name[cur_month_index]];
            cur_month_index++;
            date_index = 1;

            const cur_rows = [];
            cur_rows.push([
                month_name[cur_month_index],
                month_rows[month_name[cur_month_index]],
            ]);
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].transaction[0].date,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].transaction[0]
                    .amount,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].transaction[0]
                    .points,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].total,
                month_rows[month_name[cur_month_index]],
            ]);
            rows.push(cur_rows);
        } else {
            const cur_rows = [];
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].transaction[
                    date_index
                ].date,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].transaction[
                    date_index
                ].amount,
                1,
            ]);
            cur_rows.push([
                rowinfo.month[month_name[cur_month_index]].transaction[
                    date_index
                ].points,
                1,
            ]);
            rows.push(cur_rows);
            date_index++;
        }
    }

    return rows;
}
