# cdcManager-dev
ERP designed to help Beer-Men and their business.

# To do:
Create [5/7] => {
	User[ OK ]:
		Name, Email, Phone_number, Password, isAdmin, Creation_date,

	Customer[ OK ]:
		Name, Email, Phone_number, Document, Address, Creation_date,

	Category[ OK ]:
		Name, Description,

	Sub-category[ OK ]:
		Category, Description,

	Merchan[ OK ]:
		Category, Sub-category, Details, Id, Creation_date,

	Task [ OK ]:
		Customer, Merchandise, Gender, Details, Earnings, Deadline, Status
}

Read [4.3/5] => {
	User[ OK ]
	Customer[ OK ]
	Category[ OK ]
	Sub-category[ OK ]
	Task [
		To be done [ OK ]
		Done [ OK ]
	]
	Merchandise[
		All[ OK ]
		Sale[]
		Rent[]
		Consumable[]
	]
}

Update [0/5.3] => {
	User[]
	Customer[]
	Category[]
	Sub-category[]
	Task[ OK ]
	Merchandise[
		from-Sale[]
		from-Rent[]
		from-Consumable[]
	]
}
Delete [4/5] => {
	User[]
	Customer[ OK ]
	Category[ OK ]
	Sub-category[ OK ]
	Merchandise[ OK ]
	Task [ OK ]
}
