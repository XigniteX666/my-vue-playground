<template>
    <div id="newCar">
        <form class="vue-form" @submit.prevent="submit">
            <fieldset>
                <div>
                    <label class="label" for="brand">Brand</label>
                    <input type="text" name="brandName" id="brand" required="" v-model="brandName">
                </div>
                <div>
                    <label class="label" for="type">Type</label>
                    <input type="text" name="type" id="type" required="" v-model="type">
                </div>
                <div>
                    <label class="label" for="plate">Platenumber</label>
                    <input type="text" name="plateNumber" id="plate" required="" v-model="plate">
                </div>
                <div>
                    <label class="label" for="start_milage">Start milage</label>
                    <input type="text" name="start_milage" id="start_milage" required="" v-model="start_milage">
                </div>
                <div>
                    <input type="submit" value="Save car">
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
    name: "Car",
    methods: {
        // submit form handler
        submit: function(event) {
            
            this.submitted = true;
            var obj = {};
            var elements = event.target.querySelectorAll( "input" );
		    for( var i = 0; i < elements.length; ++i ) {
			    var element = elements[i];
		        var name = element.name;
		        var value = element.value;

			    if( name ) {
				    obj[ name ] = value;
			    }
            }		    
        }
    }
}
</script>

<style scoped>
       
    .vue-form {
        font-size: 16px;
        width: 500px;
        padding: 15px 30px;
        border-radius: 4px;
        margin: 50px auto;
        width: 500px;
        background-color: #fff;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    }
    
    .vue-form fieldset {
        margin: 24px 0 0 0;
    }

    .vue-form legend {
        padding-bottom: 10px;
        border-bottom: 1px solid #ecf0f1;
    }

    .vue-form div {
        position: relative;
        margin: 20px 0;
    }

    .vue-form .label {
        color: #94aab0;
        margin-bottom: 10px;
        display: block;
        color: #2b3e51;
    }
    .vue-form input{
        color: #2b3e51;
    }

</style>
