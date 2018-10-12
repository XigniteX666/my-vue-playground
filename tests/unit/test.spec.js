import { mount } from '@vue/test-utils'
import TestComponent from '@/components/MyFirstComponent'
import { expect} from 'chai'


describe('MyFirstComponent', () =>{
    const wrapper = mount(TestComponent,{
        propsData:{
            seen: true,
            msg: 'Hello World!'
        }
    });

    it('renders the correct output based on the seen parameter', () => {
        expect(wrapper.html()).contains("<span>Now you see me</span>")
    })

    it('button click reverses the message', () => {
        expect(wrapper.vm.msg).to.equal("Hello World!")
        const button = wrapper.find("button");
        button.trigger("click");
        expect(wrapper.vm.msg).to.equal("!dlroW olleH")
    })
})
