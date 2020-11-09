.PHONY: init-db
initdb: apply-db
	sleep 30
	kubectl exec -it mysql -- mysql -uroot -pexample < test.mysql

.PHONY: apply-db
apply-db:
	kubectl apply -f mysql.yaml

.PHONY: apply-app
apply-app:
	kubectl apply -f app.yaml

.PHONY: clean
clean:
	kubectl delete -f .

.PHONY: all
all: initdb apply-app