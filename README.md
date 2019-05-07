# cdcManager-dev
ERP designed to help Beer-Men and their business.

To do:
    Create => {
		User[]:
			Name, Email, Phone_number, Password, isAdmin, Creation_date,

		Customer[]:
			Name, Email, Phone_number, Document, Address, Creation_date,

		Category[]:
			Name, Description,

		Sub-category[]:
			Category, Description,

		Goods[]:
			Category, Sub-category, Name, Id, Status, Creation_date,

		Sale[]:
			Customer, Goods, Id, Status, Details, Creation_date
	};

    Read => {

	};
    Update => {

	};
    Delete => {

	};
