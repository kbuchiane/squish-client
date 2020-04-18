<html>
  <body>
    <div id="example">
      <p>{{ hello }}</p>
    </div>
    <script>
        new Vue({
            el: '#example',
            data: { hello: 'Hello World!' }
        })
    </script>
  </body>
</html>