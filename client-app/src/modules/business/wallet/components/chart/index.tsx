import React from 'react';
import moment from 'moment';
import {
	Chart as ChartJS,
	TextAlign,
	Align,
	CategoryScale,
	LineController,
	LinearScale,
	BarController,
	BarElement,
	LineElement,
	Filler,
	PointElement,
} from 'chart.js';
import 'chartjs-chart-financial';

ChartJS.register(
	CategoryScale,
	LineController,
	LinearScale,
	BarElement,
	BarController,
	LineElement,
	Filler,
	PointElement,
);

import styles from './style.module.scss';

const Chart = (props: Chart_Component.Props) => {
	/* Props **************************************************************************************************************************************************/
	const {
		theme = 'simple_line',
		className = '',
		status = 'increase',
		array = [],
		label = [],
		dateFormat = '',
		width = 'auto',
		height = 'auto',
	} = props;

	/* Stores *************************************************************************************************************************************************/

	/* Hooks **************************************************************************************************************************************************/
	const componentRef = React.useRef<HTMLCanvasElement>(null);
	const [pluginState, setPluginState] = React.useState<any>(null);

	/* Variables **********************************************************************************************************************************************/
	const colorList: any = {
		increase: ['#4ec41f00', '#4cd41f66', '#4dc41f'],
		decrease: ['#c41f1f00', '#c41f1f66', '#fb3030'],
		theme: ['#0036e505', '#0036e52e', '#b2c4ff'],
	};

	/* Life Circle ********************************************************************************************************************************************/
	React.useEffect(() => {
		const chartInstance = new ChartJS(componentRef.current as any, F_chartPreset());
		setPluginState(chartInstance);

		return () => {
			chartInstance.destroy();
		};
	}, []);

	React.useEffect(() => {
		pluginState && F_refreshChart();
	}, [props.theme, props.array, props.label]);

	/* Api ****************************************************************************************************************************************************/

	/* Functions **********************************************************************************************************************************************/
	function F_refreshChart() {
		const { type, data, options } = F_chartPreset();

		pluginState.type = type;
		pluginState.data = data;
		pluginState.options = options;

		pluginState.update();
	}

	function F_chartPreset() {
		if (theme === 'curve_line') {
			return {
				type: 'line' as any,
				data: {
					labels: label.map((value) => moment(value).format(dateFormat)),
					datasets: [
						{
							data: array,
							fill: true,
							borderColor: colorList.theme[2],
							backgroundColor: function (context: any) {
								const chart = context.chart;
								const { ctx, chartArea } = chart;

								if (!chartArea) {
									return null;
								}

								let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

								gradient.addColorStop(0, colorList.theme[0]);
								gradient.addColorStop(1, colorList.theme[1]);

								return gradient;
							},
						},
					],
				},
				options: {
					animation: false,
					responsive: true,
					elements: {
						point: {
							radius: 0,
						},
						line: {
							borderWidth: 1,
							tension: 0.4,
						},
					},
					scales: {
						x: {
							grid: {
								display: false,
								drawBorder: false,
							},
							ticks: {
								maxTicksLimit: 10,
								maxRotation: 0,
								font: {
									size: 10,
									family: 'Open Sans',
								},
							},
						},
						y: {
							position: 'right' as TextAlign,
							grid: {
								display: false,
								drawBorder: false,
							},
							ticks: {
								align: 'end' as Align,
								padding: 15,
								color: '#64748b',
								font: {
									size: 10,
									family: 'Open Sans',
								},
								callback: function (val: any, index: any): any {
									return index % 2 === 0 ? val?.toFixed(2)?.toString() : '';
								},
							},
						},
					},
				},
			};
		}

		if (theme === 'vertical_bar') {
			return {
				type: 'bar',
				data: {
					labels: label,
					datasets: [
						{
							data: array,
							fill: true,
							borderColor: colorList[status][2],
							backgroundColor: function (context: any) {
								const chart = context.chart;
								const { ctx, chartArea } = chart;

								if (!chartArea) {
									return null;
								}

								let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

								gradient.addColorStop(0, colorList[status][0]);
								gradient.addColorStop(1, colorList[status][1]);

								return gradient;
							},
						},
					],
				},
				options: {
					animation: false,
					responsive: true,
					elements: {
						point: {
							radius: 0,
						},
						line: {
							borderWidth: 1,
							tension: 0.4,
						},
					},
					scales: {
						x: {
							grid: {
								display: false,
								drawBorder: false,
							},
						},
						y: {
							position: 'right' as TextAlign,
							grid: {
								display: false,
								drawBorder: false,
							},
						},
					},
				},
			};
		}

		if (theme === 'candle_stick') {
			return {
				type: 'candlestick' as any,
				data: {
					labels: label.map((value) => moment(value).format(dateFormat)),
					datasets: [
						{
							data: array,
						},
					],
				},
			};
		}

		return {
			type: 'line' as any,
			data: {
				labels: array.map(() => ''),
				datasets: [
					{
						data: array,
						fill: true,
						borderColor: colorList[status][2],
						backgroundColor: function (context: any) {
							const chart = context.chart;
							const { ctx, chartArea } = chart;

							if (!chartArea) {
								return null;
							}

							let gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

							gradient.addColorStop(0, colorList[status][0]);
							gradient.addColorStop(1, colorList[status][1]);

							return gradient;
						},
					},
				],
			},
			options: {
				animation: false,
				responsive: true,
				elements: {
					point: {
						radius: 0,
					},
					line: {
						borderWidth: 1,
					},
				},
				scales: {
					x: {
						display: false,
					},
					y: {
						display: false,
					},
				},
			},
		};
	}

	/* Events *************************************************************************************************************************************************/

	/* Components *********************************************************************************************************************************************/

	/* Render *************************************************************************************************************************************************/
	return (
		<div
			className={[styles.pwChart, styles[theme], className].join(' ')}
			style={{ '--width': width, '--height': height } as React.CSSProperties}
		>
			<canvas ref={componentRef}></canvas>
		</div>
	);
};

export default Chart;
