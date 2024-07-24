import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Icon from "../accesories/icon";
import { DaysColumns, Hours } from "../../lib/const";
import AddActivity from "../modals/add-activity";
import { getHourIndex } from "../../lib/helpers";

const Activities = [
	{
		activity_name: "Futbol",
		start_time: "10:00",
		end_time: "12:00",
		code: "1234",
		day_of_week: 3,
		color: "#CCF5D1",
	},
	{
		activity_name: "Basket",
		start_time: "14:00",
		end_time: "15:00",
		code: "2413",
		day_of_week: 2,
		coach: "Chubut",
		color: "#CCF5D1",
	},
	{
		activity_name: "Volleyball",
		start_time: "16:00",
		end_time: "18:00",
		code: "1234",
		day_of_week: 5,
		coach: "Cordoba",
		color: "#CCF5D1",
	},
];

function Calendar() {
	const [activities, setActivities] = useState(Activities);
	const [showAddActivityModal, setShowAddActivityModal] = useState(false);

	const { t } = useTranslation();

	const handleAddModal = () => {
		setShowAddActivityModal(!showAddActivityModal);
	};

	return (
		<section className="h-full w-full p-4">
			<table className="w-full border-collapse border border-gray-300">
				<thead className="bg-primary-0 text-white">
					<tr>
						<th className="py-2 text-center relative">
							<button
								onClick={handleAddModal}
								className="absolute top-0 left-0 bg-primary-30 text-white text-primary-0 p-3 mr-2 rounded-lg"
							>
								<Icon iconName="plus" width={24} />
							</button>
							{t("activities.schedule")}
						</th>
						{DaysColumns.map((day, index) => (
							<th key={index} className="py-2 text-center">
								{t(`activities.${day}`)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Hours.map((hour, rowIndex) => (
						<tr key={rowIndex}>
							<td className="bg-gray-100 font-semibold text-center py-2">
								{hour}
							</td>
							{DaysColumns.map((_, colIndex) => {
								const activity = activities.find(
									(activity) =>
										activity.day_of_week === colIndex + 1 &&
										getHourIndex(activity.start_time) <= rowIndex &&
										getHourIndex(activity.end_time) > rowIndex,
								);

								return (
									<td
										key={colIndex}
										className="py-2 text-center border border-gray-300"
										style={{
											backgroundColor: activity
												? activity.color
												: "transparent",
										}}
									>
										{activity ? (
											<div className="text-sm text-gray-800">
												<span className="font-semibold">
													{activity.activity_name}
												</span>
												{activity.coach && (
													<span className="block text-xs">
														{activity.coach}
													</span>
												)}
											</div>
										) : (
											""
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			{showAddActivityModal && (
				<AddActivity
					handleAddModal={handleAddModal}
					setActivities={setActivities}
					activities={activities}
				/>
			)}
		</section>
	);
}

export default Calendar;
