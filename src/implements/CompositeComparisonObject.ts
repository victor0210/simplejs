export default class CompositeComparisonObject {
    private comparision: Array<string>
    private assertion: string
    private assertionSeparator: string = ' | '
    private assertionSuggestion: string = ''

    constructor(comparision: Array<string>, assertion: string) {
        this.setAssertion(assertion)
        this.setComparision(comparision)
        this.initAssertionSuggestion()
    }

    private setAssertion(assertion: string) {
        this.assertion = assertion
    }

    public getAssertion() {
        return this.assertion
    }

    private setComparision(comparision: Array<string>) {
        this.comparision = comparision
    }

    public getComparision() {
        return this.comparision
    }

    private initAssertionSuggestion() {
        this.assertionSuggestion = this.comparision.join(this.assertionSeparator)
    }

    public getAssertionSuggestion() {
        return this.assertionSuggestion
    }
}