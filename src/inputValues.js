export function inputValues() {
    const productName = document.getElementById("productName").value
    const productPrice = document.getElementById("productPrice").value
    const productDescription = document.getElementById("productDescription").value

    const values = {
        name: productName,
        price: productPrice,
        description: productDescription
    }

    return values
}