nameTable: tb_product

    fields:
        1. titleProduct
        2. subTitleProduct
        3. priceProduct
        4. imageProduct


    tipeData:
        1. titleProduct:
            - character
            - maxLength char 30
            - minLength char 10
            - tidak boleh kosong
            - required

        2. subTitleProduct:
            - text
            - maxLength char 255
            - required
            - tidak boleh kosong
        
        3. priceProduct:
            - number
            - required
            - tidak boleh kosong
            - harus angka
            
        4. imageProduct:
            - string
            - tidak boleh kosong
            - required
