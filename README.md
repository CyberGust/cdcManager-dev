# cdcManager
ERP designed to help Beer-Men and their business.

# Database models description:
Tasks: now it will be divided by "Rent task" and "Sell task". The rent task will collect the following data: customer(renter), start date, end date, merchandise and if necessary for the user, some observations. When creating a new task, user will read his merchandise's code bars. Then the inputs will be registered on the formulary formulary than other task's information. The Sell task will collect the following data: customer(renter), merchandise, value. Finally, dashboard will show a breadcumb with the options to see active tasks(rents), completed tasks(rents) and sold stuff. Each table will show an option to create a new task of the same category as the table's.

Merchandise: each merchandise from the phisical sotorage should be registered with its own codebar, category, name, coast value and expected selling price. Every merchandise has a status that can vary among "sell" which means that it was sold and does not exist more at user's storage, "rent" which means that the product is at some customer's and should return and "availabe", which means that it can be selled or rented. Dashboard can filter these status by selecting one from the breadcumb. Still on the breadcumb, user can create a new merchandise for his storage.

Category: categories' responsability is to know from who user buy the merchandise, how many of it must have in the storage and a shared name like "Barrel" or "Soda", because the precise definition of the merch is on it's own name not in category's name, which should be a generic one. Besides that categories are used to sort user's products by gender.

Customer: same as usual. It has a name, phone number, email, address and a identification document number. User can save, update and delete any customer at any time. Dashboard show customers sorting from "A" to "Z". User can search for a customer by name on a search bar.

Provider: it has name, phone number, address and a identification document number. Providers can be deleted, updated after its creation. Dashboard show registered providers and sort from "A" to "Z". User can search for a provider by name, using a search bar.

User: it has a name, phone number, email and a password. Only system administrator can create new user. There is no dashboard/control pannel yet.

Home: it is a dashboard that shows how much the user has invoiced in the current month, how much the user have spent or have to spend in the current month, how many tasks(rent) are running in the current time, a history of the last actions made on the system.

