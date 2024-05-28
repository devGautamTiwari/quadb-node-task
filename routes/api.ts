import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { getConnection } from "../database/connect";
import TopTickers from "../database/models/TopTickers";

dotenvExpand.expand(dotenv.config());
const apiRouter = Router();

interface CurrencyPair {
	base_unit: string;
	quote_unit: string;
	low: string;
	high: string;
	last: string;
	type: string;
	open: string;
	volume: string;
	sell: string;
	buy: string;
	at: number;
	name: string;
}

interface Tickers {
	[key: string]: CurrencyPair;
}

apiRouter.post("/top-tickers", (req, res) => {
	axios
		.get("https://api.wazirx.com/api/v2/tickers")
		.then((response) => {
			const data = response.data as Tickers;

			// Convert data object to array of objects
			const dataArray = Object.values(data);

			// Sort the array based on "high" value in descending order
			dataArray.sort((a, b) => parseFloat(b.high) - parseFloat(a.high));

			// Get the top 10 items
			const top10Items = dataArray.slice(0, 10);

			res.send(top10Items);
		})
		.catch((error) => {
			console.error("Unable to fetch data from the API:", error);
		});
});

apiRouter.get("/top-tickers", (req, res) => {
    const sequelize = getConnection(process.env.POSTGRES_CONNECTION_STRING as string);
    const TopTickersModel = TopTickers(sequelize);

    // Fetch top 10 from the table, ordery by time with latest on top
    TopTickersModel.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.error("Unable to fetch data from the database:", error);
        });

});

export default apiRouter;
