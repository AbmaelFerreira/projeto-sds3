import axios from 'axios';
import { BASE_URL } from 'components/NavBar/utils/request';
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts'
import { SaleSum } from 'types/sale';

type ChartData = {
    labels: string[];
    series: number[];
}

const DunotChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then((response) => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                setChartData({ labels: myLabels, series: mySeries });

            });

    }, []);

    //Forma errada
    // let chartData: ChartData =  {labels:[], series: []};



    // const mockData = {
    //     series: [477138, 499928, 444867, 220426, 473088],
    //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    // }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"

        />
    );
}

export default DunotChart;
