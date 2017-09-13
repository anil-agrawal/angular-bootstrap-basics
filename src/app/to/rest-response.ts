export class RestResponse {
	success = false;
	status: number;
	body: any;
	exp = false;
	expMsg: string;

	responseBodyAsJson(): object {
		return JSON.parse(this.body);
	}

	isBodyAsJSON():boolean{
		let isValidJSON = false;
		try{
			JSON.parse(this.body);
			isValidJSON = true;
		}catch(e){}
		return isValidJSON;
	}
}

