# cdcManager-dev
ERP designed to help Beer-Men and their business.

# To do:
Create [6/6] => {
	User[ OK ]:
		Name, Email, Phone_number, Password, isAdmin, Creation_date,

	Customer[ OK ]:
		Name, Email, Phone_number, Document, Address, Creation_date,

	Category[ OK ]:
		Name, Description,
	
	Provider[ OK ]:
		Name, Address, Document, Phone, Merchandise,

	Merchan[ OK ]:
		Category, Sub-category, Details, Id, Creation_date,

	Task [ OK ]:
		Customer, Merchandise, Gender, Details, Earnings, Deadline, Status
}

Read [6/6] => {
	User[ OK ]
	Provider[ OK ]
	Customer[ OK ]
	Category[ OK ]
	Sub-category[ OK ]
	Task [
		To be done [ OK ]
		Done [ OK ]
	]
	Merchandise[
		All[ OK ]
		Sale[ OK ]
		Rent[ OK ]
	]
}

Update [3/6] => {
	User[]
	Provider[ OK ]
	Customer[]
	Category[]
	Task[ OK ]
	Merchandise[ OK ]
}
Delete [5/6] => {
	User[]
	Provider[ OK ]
	Customer[ OK ]
	Category[ OK ]
	Sub-category[ OK ]
	Merchandise[ OK ]
	Task [ OK ]
}
