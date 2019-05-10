# cdcManager-dev
ERP designed to help Beer-Men and their business.

# To do:
Create [4/7] => {
	User[ OK ]:
		Name, Email, Phone_number, Password, isAdmin, Creation_date,

	Customer[ OK ]:
		Name, Email, Phone_number, Document, Address, Creation_date,

	Category[ OK ]:
		Name, Description,

	Sub-category[ OK ]:
		Category, Description,

	Merchan[]:
		Category, Sub-category, Details, Id, Status, Creation_date,
		(
			tornar todo model Merchan criado, filho do model Subcategory relacionando-o no array do model.
		)

	Sale[]:
		Customer, Goods, Status, Details, Creation_date,

	Rent[]:
		Customer, Goods, Status, Details, Creation_date
}

Read [3/7] => {
	User[ OK ]
	Customer[ OK ]
	Category[ OK ]
	Sub-category[]
	Merchandise[
		All[]
		Sale[]
		Rent[]
		Consumable[]
	]
}

Update [0/7] => {
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
Delete [1/7] => {
	User[]
	Customer[]
	Category[ OK ]
	Sub-category[]
	Merchandise[
		from-Sale[]
		from-Rent[]
		from-Consumable[]
	]
}
