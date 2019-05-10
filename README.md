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
		Category, Sub-category, Details, Id, Status, Creation_date,

	Sale[]:
		Customer, Goods, Status, Details, Creation_date,

	Rent[]:
		Customer, Goods, Status, Details, Creation_date
}

Read [4.3/5] => {
	User[ OK ]
	Customer[ OK ]
	Category[ OK ]
	Sub-category[ OK ]
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
}
