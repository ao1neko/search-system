<template>
    <div class="text-center m-3">
        <div v-for="item in pageOfItems">
            lists:{{item.name}}
        </div>
        <jw-pagination :items="exampleItems" @changePage="onChangePage"></jw-pagination>
    </div>
</template>

<script>
const exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));

export default {
    name: 'Page',
    data() {
        return {
            exampleItems,
            pageOfItems: []
        };
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        }
    }
};
</script>