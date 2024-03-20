import os
import openai
import json

class Inferencer:
    def __init__(self):
        self.__client = openai.Client()
        self.__client.api_key = os.getenv("OPENAI_API_KEY")

        self.__prompt_notes ={
            "distribution_alsa":(),
            "maison_du_roti": (),
            "marc_mushroom":(),
            "krinos":(),
            "la_fermette":(),
            "redfrog_lab":(),
            "bruno_nick":(),
            "macchi_inc":(),
            "hector_larivee": (
                "Note: Item descriptions follow the format 'NAME NUMBER+UNIT CS ORIGIN PRICE'"
                "Limes 230UN CS MEX $75.00. CS should be ignored. and the quantity field should be set to the NUMBER and unit to the UNIT. "
                "Combined units like 20/400G, 6/936ML should be changed to: quantity: 1 unit: 'CS'. Do not change the price for those items."
                "The price will always follow the ORIGIN field and should not be altered. Do not divide the price by the quantity. "
            ),
            "birri": (
                "Note: All items in this receipt have an origin of 'QC'. The price may sometimes look like 600 for 6.00$ "
                "or 3000 for 30.00$, so you may need to correct those errors. They also have some specific measurement units "
                "like 'csse' and 'esse', 'bqt' or 'bat' which should ALWAYS be replaced by 'CS' and 'pot' and 'ut' should be "
                "replaced by 'UN'. Whenever the unit is 'UN' or 'CS', the quantity field should be set to 1 regardless of text "
                "data. You will also find that the fmt field from the receipt sometimes has the quantity in it (e.g., 15lbs, "
                "in that case, the unit quantity should be 15 and the unit 'LB'). This supplier has a spwecific way of labeling "
                "product with the fields 'produits' and 'variété' which should concatenate those together. For example, if you "
                "have 'produits': 'Pomme de terre' and 'variété': 'Russet', the name should be 'Pomme de terre Russet'. It is "
                "also possible for some words to appear in camel case, like 'PommeDeTerreRusset', in that case, you should "
                "separate the words and capitalize the first letter of each word. The price of the items will always come after the 'variété' field. "
            ),
            "au_terroir": (
                "Note: Most of the items in this receipt have an origin of 'QC'."
                "Search the name of the cheese for their origin and set the origin to the country abreveation. For example, 'France' should be 'FR'"
                "The category for most of these should be 'Fromage', but some might be 'Charcuterie'."
                "The items description will come on the following format : NAME - QUANTITY+UNIT NUMBER UNIT PRICE"
                "This supplier has all of it's prices set for 1 KG, so you should always set the unit to KG and the quantity to the number 1"
                "Also reformat the names so that they are not in all caps and that they are in the language of the receipt. For example, 'POMMES DE TERRE' should be 'Pommes de terre'"
            ),
        }


    def inference(self, supplier, receipts):
        prompt = f"The following text is from a receipt.Please convert it to a JSON object.There might be some errors in the \
            item description: For example, '5LB' might have been extracted as 'SLB' since the 5 closely resembles an S. \
            Please fix those errors. The JSON object should only contain the items and their price per unit (if there are \
            two prices for the same item use the smallest of the 2). Units that are labeled GR should be changed to G. LT to L \
            CL is not an origin tag it should be ignored. It is possible for items to not have an origin. The QUANTITY-UNIT \
            should be in 2 unique fields also add a category field. The category should be logical with the item name, \
            and should be in the language of the receipt. Use the following categories: 'Fruit & Légume', \
            'Viande', 'Poisson', 'Produit Laitier', 'Pâtisserie', 'Cannes', 'Congeler', 'Sec', 'Fines Herbes'. Make sure to filter duplicate items.\
            If the item is not in the list use 'Autre'. A mushroom should be classified as 'Fruit & Légume' The JSON structure for an item \
            should be: 'name': 'NAME OF PRODUCT', 'quantity': number, 'unit': 'UNIT OF PRODUCT', 'origin': 'ORIGIN TAG OF \
            PRODUCT', 'category': 'ONE OF THE CATEGORY', 'price': number . Make sure to correct common french mistakes (e.g lls should be île) {self.__prompt_notes[supplier]}"
    

        response = openai.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        },
                        {
                            "type": "text",
                            "text": receipts
                        }
                        
                    ],
                }
            ],
            max_tokens=4096,
        )

        usage = response.usage
        print(usage)

        json_string = response.choices[0].message.content.replace("```json\n", "").replace("\n```", "");
        json_data = json.loads(json_string)


        return json_data