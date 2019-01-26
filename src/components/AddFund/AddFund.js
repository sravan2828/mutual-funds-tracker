import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import styles from './styles.module.css';
import moment from "moment";

class FundModal extends Component {

	state = {
		fundName: "",
		amount: 0,
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	}

	getFundValue = () => {
		const {data, trackFund} = this.props;
		const {date, fundId, amount} = this.state;
		if(data && fundId && amount){
			const investedDate = moment(date).format('DD-MMM-YYYY');
			const fund = data[fundId];
			let initialFundProfile = fund.filter((item)=> (item.date === investedDate))[0];
			if(initialFundProfile){
				const investedNav = initialFundProfile.netAssetValue.toFixed(0);
				const currentNav = fund[fund.length -1].netAssetValue.toFixed(0);
				const curretValue = ((amount/investedNav)*currentNav).toFixed(0);
				trackFund({fundId,amount,curretValue,currentNav});
				console.log("CurrentNav: ",currentNav, "invested Date: ",investedDate, "investedNav: ", investedNav, "curretValue: ", curretValue);
			}
		}
	}

	render() {
		const { data } = this.props;
		const schemes = Object.keys(data).map((key)=> {
			return {
				fundId: key,
				fundName: data[key][0].schemeName
			};
		});
		return (
			<Card className={styles.cardContainer}>
				<CardContent>
					<div className={styles.form}>
						<ul>
							<li>
								<FormControl >
									<InputLabel htmlFor="age-native-simple">Fund Name</InputLabel>
									<Select
										native
										//value={this.state.fundName}
										onChange={this.handleChange('fundId')}
									>
										<option value="" />
										{schemes.map((scheme) => {
											return <option value={scheme.fundId} key={scheme.fundId}>{scheme.fundName}</option>;
										})}
									</Select>
								</FormControl>
							</li>
							<li>
								<label htmlFor="startdate">Start Date</label>
								<input
									id="startdate"
									label="StartDate"
									name="startDate"
									type="date"
									onChange={this.handleChange('date')}
								/>
							</li>
							<li>
								<TextField
									id="standard-number"
									label="Amount"
									//value={this.state.amount}
									onChange={this.handleChange('amount')}
									type="number"
									InputLabelProps={{
										shrink: true,
									}}
									margin="normal"
								/>
							</li>
							<li>
								<Button type="submit" variant="contained" color="primary" onClick={this.getFundValue}>
									<Fragment>
										Get Current Value
									</Fragment>
								</Button>
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		);
	}
}

export default FundModal;
